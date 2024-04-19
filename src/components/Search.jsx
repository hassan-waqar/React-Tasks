import React, { useEffect, useState } from 'react';
import algoliasearch from 'algoliasearch';
import Select from 'react-select';

const Search = () => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Initialize Algolia client
    const algoliaClient = algoliasearch('J16E32DSRA', '46eb4297f5942dca483f9a7cd6dcd1ce');
    const algoliaIndex = algoliaClient.initIndex('testing_algolia');

    useEffect(() => {
        // Function to perform search query
        const search = async (query) => {
            try {
                const result = await algoliaIndex.search(query);
                setSearchResults(result.hits);
            } catch (error) {
                console.error('Error searching:', error);
                setSearchResults([]);
            }
        };

        // Trigger search when query changes
        search(query);
    }, [query]);

    // Function to handle input change
    const handleInputChange = (selectedOption) => {
        if (selectedOption) {
            setQuery(selectedOption.value);
        } else {
            setQuery('');
        }
    };

    // Transform search results into options for react-select
    const options = searchResults.map((item) => ({
        value: item.name,
        label: item.name,
    }));

    return (
        <div>
            <Select
                isSearchable
                value={{ value: query, label: query }}
                onChange={handleInputChange}
                options={options}
                isClearable
                placeholder="Search..."
            />
        </div>
    );
};

export default Search;
