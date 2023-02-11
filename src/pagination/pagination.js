import { Pagination } from 'antd';

function Paginationmovieslist({pageNum, setPage, totalPages}) {
  return <Pagination className="pagination"  defaultCurrent={1} onChange={(page)=>setPage(page)} current={pageNum}  total={totalPages} />;
}

export default Paginationmovieslist;