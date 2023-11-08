import { useEffect, useState } from "react";
import { IJob, ISkill } from "./interfaces";
import axios from "axios";
import { ImSpinner9 } from "react-icons/im";

const jobsUrl = "https://edwardtanguay.vercel.app/share/jobs.json";
const skillsUrl = "https://edwardtanguay.vercel.app/share/skills_with_id.json";

function App() {
	const [jobs, setJobs] = useState<IJob[]>([]);
	const [skills, setSkills] = useState<ISkill[]>([]);

	useEffect(() => {
		// IIFE
		(async () => {
			const response = await axios.get(jobsUrl);
			const _jobs: IJob[] = response.data;
			for (const _job of _jobs) {
				_job.isOpen = false;
			}
			setJobs(_jobs);
		})();

		(async () => {
			const response = await axios.get(skillsUrl);
			const _skills: ISkill[] = response.data;
			setSkills(_skills);
		})();

		// one could also use then() but it has a less aesthetic syntax
		//  axios.get('')
		//         .then((response) =>
		//             setJobs(response?.data? [])
		//         );
	}, []);

	return (
		<>
			<h1 className="text-3xl mb-3 text-slate-800">Info Site</h1>
			<div className="flex justify-around">
				<section>
					<h2 className="text-xl mb-3">
						{jobs.length === 0 ? (
							<div>
								<ImSpinner9 className="animate-spin text-4xl text-slate-400" />
							</div>
						) : (
							<div>There are {jobs.length} jobs.</div>
						)}
					</h2>
					{jobs.map((job) => {
						return (
							<div
								key={job.id}
								className="bg-slate-400 w-80 p-2 mb-2 rounded"
							>
								<p>{job.title}</p>
								{job.isOpen && (
									<>
										<p>{job.company}</p>
										<p>{job.publicationDate}</p>
									</>
								)}
							</div>
						);
					})}
				</section>
				<section>
					<h2 className="text-xl mb-3">
						{skills.length === 0 ? (
							<div>
								<ImSpinner9 className="animate-spin text-4xl text-slate-400" />
							</div>
						) : (
							<div>There are {skills.length} skills.</div>
						)}
					</h2>
					{skills.map((skill) => {
						return (
							<div
								key={skill.id}
								className="bg-gray-400 w-80 p-2 mb-2 rounded"
							>
								<p>{skill.name}</p>
							</div>
						);
					})}
				</section>
			</div>
		</>
	);
}

export default App;
