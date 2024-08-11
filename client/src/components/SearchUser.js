import React, { useEffect, useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import SearchUserDisplay from './SearchUserDisplay';
import toast from 'react-hot-toast';
import axios from 'axios';
import { IoClose } from "react-icons/io5";

const SearchUser = ({ onClose, loggedInUserId }) => {
    // Defining the SearchUser component. It receives two props: `onClose` (to handle closing the search) and `loggedInUserId` (the ID of the logged-in user).

    const [usersList, setUsersList] = useState([]);
    // State to store the list of users returned from the search.

    const [loading, setLoading] = useState(false);
    // State to track whether the search request is currently in progress (loading).

    const [query, setQuery] = useState("");
    // State to store the search query entered by the user.

    const handleSearchUser = async () => {
        // Function to handle the user search.

        const URL = `${process.env.REACT_APP_BACKEND_URL}/api/search-user`;
        // URL for the backend API endpoint to search for users.

        if (!query.trim()) {
            // Check if the search query is empty or just whitespace.
            setUsersList([]);
            // If so, clear the user list.
            return;
            // Exit the function early since there's no valid query.
        }

        try {
            setLoading(true);
            // Set the loading state to true before starting the API request.

            const response = await axios.post(URL, { search: query });
            // Make a POST request to the backend API with the search query.

            const filteredUsers = response.data.data.filter(user => user._id !== loggedInUserId);
            // Filter out the logged-in user from the search results.

            setUsersList(filteredUsers);
            // Update the users state with the filtered search results.

        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred");
            // If there's an error, show a toast notification with the error message or a default error message.
        } finally {
            setLoading(false);
            // Regardless of success or failure, set the loading state to false after the request completes.
        }
    }

    useEffect(() => {
        // useEffect hook to perform the search with a debounce effect when the query changes.

        const delayDeboundFn = setTimeout(() => {
            // Set a timeout to delay the execution of the search request.
            handleSearchUser();
            // Call the search function after the delay.
        }, 500); // 500ms debounce delay

        return () => clearTimeout(delayDeboundFn);
        // Cleanup function to clear the timeout if the query changes before the delay completes, preventing unnecessary requests.
    }, [query]);
    // useEffect dependency array containing `query`, meaning the effect runs whenever `query` changes.

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 p-2 z-10'>

            <div className='w-full max-w-lg mx-auto mt-10'>
                {/* Centered container for the search input and results, with a maximum width and some top margin */}

                <div className='bg-white h-14 overflow-hidden flex'>
                    {/* Search bar container with a fixed height and white background */}

                    <input
                        type='text'
                        placeholder='Search user by name, email,...'
                        className='w-full outline-none py-1 h-full px-4'
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                    />
                    {/* Input field for entering the search query. Updates the `query` state on change. */}

                    <div className='h-14 w-14 flex justify-center items-center'>
                        <IoIosSearch size={35} />
                        {/* Search icon next to the input field */}
                    </div>
                </div>

                <div className='bg-white mt-2 w-full p-4'>
                    {/* Container for displaying search results or messages, with padding and a white background */}

                    {
                        usersList.length === 0 && !loading && (
                            <p className='text-center text-slate-500'>No user found!</p>
                            // If no users are found and not loading, show a message.
                        )
                    }

                    {
                        loading && (
                            <div className='flex justify-center'>

                                <div role="status">
                                    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span class="sr-only">Loading...</span>
                                </div>

                            </div>
                        )
                        // If loading, show a spinner to indicate the search is in progress.
                    }

                    {
                        usersList.length !== 0 && !loading && (
                            usersList.map(user => {
                                return (
                                    <SearchUserDisplay key={user._id} user={user} onClose={onClose} />
                                    // Map through the list of users and display each one using the `SearchUserDisplay` component. Pass `onClose` prop to it.
                                )
                            })
                        )
                        // If users are found and not loading, map through the list and render each user.
                    }
                </div>
            </div>

            <div className='absolute top-0 right-0 text-2xl p-2 lg:text-4xl hover:text-white' onClick={onClose}>
                <button>
                    <IoClose />
                </button>
            </div>
        </div>
    );
}

export default SearchUser;
