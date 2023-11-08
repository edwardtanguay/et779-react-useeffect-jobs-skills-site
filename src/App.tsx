import { useEffect, useState } from "react";
import { IJob, ISkill } from "./interfaces";
import axios from "axios";

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
						There are {jobs.length} jobs.
					</h2>
					{jobs.map((job) => {
						return (
							<div
								key={job.id}
								className="bg-slate-400 w-80 p-2 mb-2 rounded"
							>
								<p>{job.title}</p>
							</div>
						);
					})}
				</section>
				<section>
					<h2 className="text-xl mb-3">
						There are {skills.length} skills.
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
