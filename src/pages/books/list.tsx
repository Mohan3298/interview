import React from "react";
import { books, tableHeadings } from "./constant";

interface FilterDropDownProps {
    genres: any[];
    authors: any[];
}

const Books = () => {
    const [tableData, setTableData] = React.useState<any[]>([]);
    const [filterDropDown, setFilterDropDown] = React.useState(
        {} as FilterDropDownProps
    );
    const [filterValues, setFilterValues] = React.useState({
        author: "",
        genre: "",
    });

    const getDropDownValues = (key: string) => {
        const data = Array.from(
            new Set([...books.books.map((x: any) => x?.[key])])
        );
        return data;
    };

    React.useEffect(() => {
        setTableData(books.books);
        setFilterDropDown({
            genres: getDropDownValues("genre"),
            authors: getDropDownValues("author"),
        });
    }, [books]);

    React.useEffect(() => {
        if (filterValues.author || filterValues.genre) {
            const { author, genre } = filterValues;
            setTableData((prev) =>
                books.books.filter((book) =>
                    author && genre
                        ? book.author === author && book.genre === genre
                        : book.author === author || book.genre === genre
                )
            );
        }
    }, [filterValues]);

    const handleChange = (event: any) => {
        const target = event.target;
        setFilterValues((prev) => ({
            ...prev,
            [target.name]: target.value,
        }));
    };

    return (
        <React.Fragment>
            <select name="genre" onChange={handleChange}>
                {(filterDropDown.genres || []).map((genre: any) => {
                    return <option value={genre}>{genre}</option>;
                })}
            </select>

            <select name="author" onChange={handleChange}>
                {(filterDropDown.authors || []).map((author: any) => {
                    return <option value={author}>{author}</option>;
                })}
            </select>
            <table border={1}>
                {tableHeadings.map((heading) => {
                    return <th>{heading}</th>;
                })}
                {tableData.map((book) => {
                    return (
                        <tr>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.genre}</td>
                            <td>{book.totalCopies}</td>
                            <td>{book.availableCopies}</td>
                        </tr>
                    );
                })}
            </table>
        </React.Fragment>
    );
};

export default Books;
