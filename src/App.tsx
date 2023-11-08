import { useEffect, useState } from "react";
import { IJob, ISkill } from "./interfaces";
import axios from "axios";
import { FaRegWindowClose } from "react-icons/fa";
import ReactModal from "react-modal";
import { JobsSection } from "./components/JobsSection";
import { ImSpinner9 } from "react-icons/im";

const jobsUrl = "https://edwardtanguay.vercel.app/share/jobs.json";
const skillsUrl = "https://edwardtanguay.vercel.app/share/skills_with_id.json";

function App() {
	const [jobs, setJobs] = useState<IJob[]>([]);
	const [skills, setSkills] = useState<ISkill[]>([]);
	const [numberOfToggles, setNumberOfToggles] = useState(-3);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [cookiesAllowed, setCookiesAllowed] = useState(false);

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

			// cookie logic
			const localStorageCookiesAllowedString =
				localStorage.getItem("cookiesAllowed");
			const localStorageCookiesAllowed =
				localStorageCookiesAllowedString === "true";
			if (localStorageCookiesAllowedString === null) {
				setModalIsOpen(true);
			} else {
				setCookiesAllowed(localStorageCookiesAllowed);
				setNumberOfToggles(-1);
			}
		})();

		// one could also use then() but it has a less aesthetic syntax
		//  axios.get('')
		//         .then((response) =>
		//             setJobs(response?.data? [])
		//         );
	}, []);

	useEffect(() => {
		if (cookiesAllowed) {
			setNumberOfToggles((n) => n + 1);
		}
	}, [jobs, skills]);

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

	const handleCookiesClose = () => {
		setModalIsOpen(false);
		setCookiesAllowed(false);
	};

	const handleCookiesDecline = () => {
		setModalIsOpen(false);
		setCookiesAllowed(false);
		localStorage.setItem("cookiesAllowed", "false");
	};

	const handleCookiesAccept = () => {
		setModalIsOpen(false);
		setCookiesAllowed(true);
		localStorage.setItem("cookiesAllowed", "true");
		setNumberOfToggles(0);
	};

	// const handleCookiesAccept = () => {

	// }

	return (
		<>
			<header className="mb-3 text-slate-300 p-4 bg-slate-700 flex items-center justify-between">
				<h1 className="text-3xl ">Info Site</h1>
				{cookiesAllowed && (
					<p className="text-yellow-200">
						Toggles: {numberOfToggles}
					</p>
				)}
			</header>
			<ReactModal
				isOpen={modalIsOpen}
				onRequestClose={handleCookiesClose}
				className="p-4 mx-auto mt-20 w-1/2 bg-slate-400 flex flex-col"
			>
				<section className="flex justify-end ">
					<div
						className="flex justify-center items-center cursor-pointer"
						onClick={() => setModalIsOpen(false)}
					>
						<FaRegWindowClose />
					</div>
				</section>
				<h2 className="text-2xl mb-3">Cookie Consent</h2>
				<p>
					This website uses cookies to improve your experience while
					you navigate through the website. Out of these cookies, the
					cookies that are categorized as necessary are stored on your
					browser as they are essential for the working of basic
					functionalities of the website. We also use third-party
					cookies that help us analyze and understand how you use this
					website. These cookies will be stored in your browser only
					with your consent. You also have the option to opt-out of
					these cookies. But opting out of some of these cookies may
					have an effect on your browsing experience.
				</p>
				<div className="flex gap-3 mt-3">
					<button onClick={handleCookiesAccept}>Accept</button>
					<button onClick={handleCookiesDecline}>Decline</button>
				</div>
			</ReactModal>
			<div className="flex justify-around">

				<JobsSection setJobs={setJobs} jobs={jobs} />
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
