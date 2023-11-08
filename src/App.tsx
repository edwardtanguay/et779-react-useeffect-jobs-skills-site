import { useEffect, useState } from "react";
import { IJob, ISkill } from "./interfaces";
import axios from "axios";
import { ImSpinner9 } from "react-icons/im";
import React from "react";

const jobsUrl = "https://edwardtanguay.vercel.app/share/jobs.json";
const skillsUrl = "https://edwardtanguay.vercel.app/share/skills_with_id.json";

function App() {
	const [jobs, setJobs] = useState<IJob[]>([]);
	const [skills, setSkills] = useState<ISkill[]>([]);
	const [numberOfToggles, setNumberOfToggles] = useState(0);

	useEffect(() => {
		// IIFE
		(async () => {
			const _skills: ISkill[] = (await axios.get(skillsUrl)).data;
			for (const _skill of _skills) {
				_skill.isOpen = false;
			}
			setSkills(_skills);

			const _jobs: IJob[] = (await axios.get(jobsUrl)).data;
			for (const _job of _jobs) {
				_job.isOpen = false;

				const _jobSkills: ISkill[] = [];
				for (const skillIdCode of _job.skillList
					.split(",")
					.map((m) => m.trim())) {
					const _skill = _skills.find(
						(m) => m.idCode === skillIdCode
					);
					if (_skill) {
						_jobSkills.push(_skill);
					}
				}
				_job.skills = _jobSkills;
			}
			setJobs(_jobs);
		})();

		// one could also use then() but it has a less aesthetic syntax
		//  axios.get('')
		//         .then((response) =>
		//             setJobs(response?.data? [])
		//         );
	}, []);

	useEffect(() => {
		console.log("jobs or skills changed" + Math.random());
	}, [jobs, skills]);

	const handleJobToggle = (job: IJob) => {
		jobs.forEach((m) => {
			if (m.id !== job.id) {
				m.isOpen = false;
			}
		});
		job.isOpen = !job.isOpen;
		const _jobs = structuredClone(jobs);
		setJobs(_jobs);
	};

	const handleSkillToggle = (skill: ISkill) => {
		skills.forEach((m) => {
			if (m.id !== skill.id) {
				m.isOpen = false;
			}
		});
		skill.isOpen = !skill.isOpen;
		const _skills = structuredClone(skills);
		setSkills(_skills);
	};
	return (
		<>
			<header className="mb-3 text-slate-300 p-4 bg-slate-700 flex items-center justify-between">
				<h1 className="text-3xl ">Info Site</h1>
				<p>Toggles: {numberOfToggles}</p>
			</header>
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
					<div
						className={`${
							jobs.length !== 0 ? "opacity-100" : "opacity-0"
						} transition-opacity duration-1000 ease-in-out`}
					>
						{jobs.map((job) => {
							return (
								<div
									key={job.id}
									className="cursor-pointer bg-slate-400 w-80 p-2 mb-2 rounded select-none"
									onClick={() => handleJobToggle(job)}
								>
									<p
										className={`${
											job.isOpen ? "font-bold" : ""
										}`}
									>
										{job.title}
									</p>
									{job.isOpen && (
										<div className="text-orange-900">
											<p>{job.company}</p>
											<p>{job.publicationDate}</p>
											<p>
												{job.skills.map(
													(skill, index) => {
														return (
															<React.Fragment
																key={index}
															>
																<a
																	onClick={(
																		e
																	) => {
																		e.stopPropagation();
																	}}
																	title={
																		skill.description
																	}
																	target="_blank"
																	className="underline"
																	href={
																		skill.url
																	}
																>
																	{skill.name}
																</a>
																{index <
																	job.skills
																		.length -
																		1 &&
																	", "}
															</React.Fragment>
														);
													}
												)}
											</p>
										</div>
									)}
								</div>
							);
						})}
					</div>
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
								className="select-none cursor-pointer bg-gray-400 w-80 p-2 mb-2 rounded"
								onClick={() => handleSkillToggle(skill)}
							>
								<p>{skill.name}</p>
								{skill.isOpen && (
									<div className="text-orange-900">
										<p>{skill.description}</p>
									</div>
								)}
							</div>
						);
					})}
				</section>
			</div>
		</>
	);
}

export default App;
