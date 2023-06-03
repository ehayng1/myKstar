import { useState } from "react";
import { searchDictionary } from "../../../utils/Dictionary/searchDictionary";

const Search = ({ onSearchWord }) => {

    const [word, setWord] = useState("");

    const handleClick = async (event) => {
        event.preventDefault();
        try {
            const dictionaryResult = await searchDictionary(word);
            if (dictionaryResult) {
                onSearchWord(dictionaryResult);
            } else {
                alert("No word found");
            }
        } catch (error) {
            alert("Incorrect search. Please try again.");
        }
    }


    return (
        <header>
            <blockquote>
                <h1>
                    My K Star Dictionary
                </h1>
                <footer>
                    <h2>
                        Find meanings and save for quick reference
                    </h2>
                </footer>
            </blockquote>
            <section>
                <form className="bookmark-form">
                    <input
                        type="text"
                        onChange={(event) => {
                            setWord(event.target.value);
                        }}
                        defaultValue={word}
                    />
                    <button onClick={async (e) => await handleClick(e)} type="submit">
                        Search
                    </button>
                </form>
            </section>
        </header>
    )
}

export default Search;