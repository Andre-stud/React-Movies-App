import { Pagination } from 'antd';

function Paginationmovieslist({ pageNum, setPage, totalPages }) {
  return (
    <div className="pagination">
      <Pagination defaultCurrent={1} onChange={(page) => setPage(page)} current={pageNum} total={totalPages * 10} />
    </div>
  );
}

export default Paginationmovieslist;
