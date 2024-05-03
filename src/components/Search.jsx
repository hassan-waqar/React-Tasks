import React, { useEffect, useState } from 'react';
import algoliasearch from 'algoliasearch';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import { fetchData } from "../api/UserProducts";

const Search = () => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const history = useNavigate(); // Get history object

    // Initialize Algolia client
    const algoliaClient = algoliasearch('J16E32DSRA', '46eb4297f5942dca483f9a7cd6dcd1ce');
    const algoliaIndex = algoliaClient.initIndex('e-commerce');

    const setUp = async () => {
        const products = await fetchData()
        const productsWithObjectId = products.map(product => ({
            ...product,
            objectID: product.id,
            id: undefined, // Remove the 'id' property
        }));

        algoliaIndex.saveObjects(productsWithObjectId).then(({ objectIDs }) => {
            console.log('Product data indexed:', objectIDs);
        }).catch(error => {
            console.error('Error indexing product data:', error);
        });
    }

    useEffect(() => {
        setUp()
    }, []);

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

    // Function to handle option selection
    const handleOptionSelect = (selectedOption) => {
        // Redirect to the product page when an option is selected
        if (selectedOption) {
            const product = searchResults.find(item => item.name === selectedOption.value);
            if (product) {
                history(`product/${product.objectID}`);
            }
        }
    };

    // Transform search results into options for react-select
    const options = searchResults.map((item) => ({
        value: item.name,
        label: item.name,
    }));

    return (
        <div style={{
            width: "100%",
            padding: "5px 10px",
        }}>
            <Select
                isSearchable
                styles={{
                    control: (provided) => ({
                        ...provided,
                        height: "50px",
                        minHeight: "30px", // Vertically center the input
                    }),
                    input: (provided) => ({
                        ...provided,
                        height: "100%", // Adjust the height of the input field
                        margin: "-30px 0px", // Reset margin to ensure it aligns properly
                    }),
                    indicatorsContainer: (provided) => ({
                        ...provided,
                        height: "50px",
                        minHeight: "30px", // Adjust the height of the indicators container
                    }),
                }}
                value={{ value: query, label: query }}
                onChange={handleInputChange}
                options={options}
                isClearable
                placeholder="Search..."
                // Call handleOptionSelect when an option is selected
                onChange={handleOptionSelect}
            />
        </div>
    );
};

export default Search;
