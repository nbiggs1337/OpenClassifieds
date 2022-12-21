import React from 'react';
import { Link } from "react-router-dom";

function Categories() {
    return (
        <>
            <table>
                <tr>
                    <th>Categories</th>

                </tr>
                <tr>
                    <td>
                        <Link to="/listings/cars" >Cars</Link>
                    </td>

                </tr>
                
            </table>
        </>
    )
}

export default Categories