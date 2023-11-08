import { IJob } from "../interfaces";
import React from "react";
import { ImSpinner9 } from "react-icons/im";

interface IProps {
	jobs: IJob[];
	setJobs: (jobs: IJob[]) => void;
}
export const JobsSection = ({ jobs, setJobs }: IProps) => {

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

	return (
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
							<p className={`${job.isOpen ? "font-bold" : ""}`}>
								{job.title}
							</p>
							{job.isOpen && (
								<div className="text-orange-900">
									<p>{job.company}</p>
									<p>{job.publicationDate}</p>
									<p>
										{job.skills.map((skill, index) => {
											return (
												<React.Fragment key={index}>
													<a
														onClick={(e) => {
															e.stopPropagation();
														}}
														title={
															skill.description
														}
														target="_blank"
														className="underline"
														href={skill.url}
													>
														{skill.name}
													</a>
													{index <
														job.skills.length - 1 &&
														", "}
												</React.Fragment>
											);
										})}
									</p>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</section>
	);
};
