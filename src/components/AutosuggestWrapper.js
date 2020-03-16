import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const getSuggestions = async value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return await inputLength < 2 ? [] : queryPlaces(value);
};

const getSuggestionValue = suggestion => suggestion.place_name;

async function queryPlaces(query) {
    const response = await fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + query + '.json?access_token=' + MAPBOX_TOKEN);
    const data = await response.json();
    return data.features ? data.features : [];
}

function AutosuggestWrapper(props) {
    const {viewport, setViewport} = props;
    const [suggestions, setSuggestions] = useState([]);
    const [value, setValue] = useState('');

    const renderSuggestion = suggestion => (
        <div onClick={() => {
            setViewport({
                ...viewport,
                latitude: Number(suggestion.center[1]),
                longitude: Number(suggestion.center[0])
            })
        }}>
            {suggestion.place_name}
        </div>
    );

    const onChange = (event, { newValue }) => {
        setValue(newValue);
    };

    const onSuggestionsFetchRequested = async ({ value }) => {
        setSuggestions(await getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const inputProps = {
        placeholder: 'Search for a location...',
        value,
        onChange
    };

    return (
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
        />
    );
}

export default AutosuggestWrapper;