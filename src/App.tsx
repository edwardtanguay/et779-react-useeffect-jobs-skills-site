import { useEffect, useState } from "react";
import { IJob } from "./interfaces";
import axios from "axios";

const jobsUrl = "https://edwardtanguay.vercel.app/share/jobs.json";

function App() {
	const [jobs, setJobs] = useState<IJob[]>([]);

	useEffect(() => {

		// IIFE
		(async () => {
			const response = await axios.get(jobsUrl);
			const _jobs = response.data;
			console.log('_jobs', _jobs);
			setJobs(_jobs);
			console.log('jobs', jobs);
		})();
//  axios.get('')
//         .then((response) =>
//             setJobs(response?.data? [])
//         );

	}, []);

	return (
		<>
			<h1 className="text-3xl mb-3 text-slate-800">Info Site</h1>
			<h2 className="text-xl mb-3">There are {jobs.length} jobs.</h2>
			<section>
				{jobs.map(job => {
					return (
						<div key={job.id} className="bg-slate-400 w-80 p-2 mb-2 rounded">
							<p>{job.title}</p>
						</div>
					)
				})}
			</section>
		</>
	);
}

export default App;
