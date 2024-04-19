import React, {useEffect, useState} from 'react';
import algoliasearch from 'algoliasearch';

const SearchComponent = () => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Initialize Algolia client
    const algoliaClient = algoliasearch('J16E32DSRA', '46eb4297f5942dca483f9a7cd6dcd1ce');
    const algoliaIndex = algoliaClient.initIndex('testing_algolia');

    const setData = () =>  {
        const objects = [{
            name: 'The Dark Knight',
            objectID: 'myID1'
        }, {
            name: 'Winder Soldier',
            objectID: 'myID2'
        },{
            name: 'Tokyo Ghoul',
            objectID: 'myID3'
        }, {
            name: 'Attack On titan',
            objectID: 'myID4'
        },{
            name: 'Far Cry',
            objectID: 'myID5'
        }, {
            name: 'Intersteller',
            objectID: 'myID6'
        }];

        algoliaIndex.saveObjects(objects)
            .then(({ objectIDs }) => {
                console.log('Objects saved successfully with IDs:', objectIDs);
            })
            .catch(error => {
                console.error('Error saving objects:', error);
            });
    }

    useEffect(() => {
        setData()
    }, []);

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


    // Function to handle input change
    const handleInputChange = (event) => {
        const newQuery = event.target.value;
        setQuery(newQuery);
        search(newQuery);
    };

    // Combine Algolia search results with dummy data
    const combinedData = [...searchResults];

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search..."
            />
            <ul>
                {combinedData.map((item) => (
                    <li key={item.objectID}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchComponent;
