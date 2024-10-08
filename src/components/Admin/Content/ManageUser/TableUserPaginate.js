import ReactPaginate from 'react-paginate';
import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';

const TableUserPaginate = ({ listUsers,
    handleClickBtnUpdate,
    handleClickBtnView,
    handleClickBtnDelete,
    fetchUsersPaginate,
    pageCount,
    currentPage,
    setCurrentPage }) => {
    const handlePageClick = async (event) => {
        setCurrentPage(event.selected + 1);
        await fetchUsersPaginate(event.selected + 1);
    };


    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 ? (
                        listUsers.map((item, index) => (
                            <tr key={`table-user-${index}`}>
                                <td scope="row">{item.id}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td>
                                    <button className="btn btn-secondary" onClick={() => handleClickBtnView(item)}>View</button>
                                    <button className="btn btn-warning mx-3" onClick={() => handleClickBtnUpdate(item)}>Update</button>
                                    <button className="btn btn-danger" onClick={() => handleClickBtnDelete(item)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5}>No data</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className='user-pagination'>
                <ReactPaginate
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< Previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={currentPage - 1}
                />
            </div>


        </>
    );
};

export default TableUserPaginate;
