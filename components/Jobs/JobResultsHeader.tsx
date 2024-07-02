import { useState } from 'react';

const JobResultsHeader = ({ totalJobs }: { totalJobs: number }) => {
  const [sortOption, setSortOption] = useState('Recent');
  const [postsPerPage, setPostsPerPage] = useState(20);

  return (
    <>
    <div className="p-2 bg-successbg border border-successborder rounded-lg text-center mb-4">
      <h2 className="text-lg font-semibold text-successText">{totalJobs} Jobs Found</h2>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="text-gray-600">
          <span className="font-semibold">{totalJobs}</span> Job Results
        </div>
        <div className="flex space-x-4">
          <div>
            <label htmlFor="sort" className="mr-2 text-gray-600">Sort by</label>
            <select
              id="sort"
              className="border border-gray-300 rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="Recent">Recent</option>
              <option value="Oldest">Oldest</option>
              <option value="Relevance">Relevance</option>
            </select>
          </div>
          <div>
            <label htmlFor="postsPerPage" className="mr-2 text-gray-600">Posts Per Page</label>
            <select
              id="postsPerPage"
              className="border border-gray-300 rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={postsPerPage}
              onChange={(e) => setPostsPerPage(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>
      </>
  );
};

export default JobResultsHeader;
