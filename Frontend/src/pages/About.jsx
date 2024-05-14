import React from "react";
import { Link } from "react-router-dom";

function About() {
	return (
		<div className="p-0 m-0 mx-auto text-light video-container">
      <video src="/about-rain.mp4" typeof="video/mp4" autoPlay loop muted disablePictureInPicture></video>
      <h1>Contributors</h1>
			<div className="row mb-3 w-100 mt-4 mx-auto justify-content-between">
				<div className="dark-box ms-3 ps-4 col glass-morph">
					<div className="d-flex justify-content-between m-1 p-3">
						<img
							src="/adyasha.jpg"
							width={150}
							alt=""
						/>
						<div>
							<h5>Adyasha Panda</h5>
							<br />
							<p>Contact:</p>
							<Link
								to={
									"https://www.linkedin.com/in/adyasha-panda-/"
								}
								style={{ color: "var(--base-blue)" }}
							>
								LinkedIn
							</Link>
							<br />
							<Link
								to={`mailto:adyashap800@gmail.com`}
								style={{ color: "var(--base-blue)" }}
							>
								Mail
							</Link>
						</div>
					</div>
				</div>
				<div className="col-md-8"></div>
			</div>

			<div className="row mb-3 w-100 mt-4 mx-auto justify-content-between">
				<div className="col-md-8"></div>
				<div className="dark-box ms-3 ps-4 col glass-morph">
					<div className="d-flex justify-content-between m-1 p-3">
						<div>
							<h5>Ansuman Parija</h5>
							<br />
							<p>Contact:</p>
							<Link
								to={
									"https://www.linkedin.com/in/ansuman-parija-a37157248/"
								}
								style={{ color: "var(--base-blue)" }}
							>
								LinkedIn
							</Link>
							<br />
							<Link
								to={`mailto:ansumanparija982@gmail.com`}
								style={{ color: "var(--base-blue)" }}
							>
								Mail
							</Link>
						</div>
						<img
							src="https://media.licdn.com/dms/image/D5603AQH6loB1l2HZiA/profile-displayphoto-shrink_800_800/0/1703866437970?e=1721260800&v=beta&t=54iF-ZmA-_mGfGi5m8M6gDF4rYoyge0dxFcivtMC57Q"
							width={150}
							alt=""
						/>
					</div>
				</div>
			</div>

			<div className="row mb-3 w-100 mt-4 mx-auto justify-content-between">
				<div className="dark-box ms-3 ps-4 col glass-morph">
					<div className="d-flex justify-content-between m-1 p-3 ">
						<img
							src="https://media.licdn.com/dms/image/D4D03AQGvrD82kPQf7Q/profile-displayphoto-shrink_800_800/0/1671470473667?e=1721260800&v=beta&t=nvgPPoOrERzQXyS3rxoycwawAtiWcVMfZ4ScRNZXeik"
							width={150}
							alt=""
						/>
						<div>
							<h5>Cheerag Routaray</h5>
							<br />
							<p>Contact:</p>
							<Link
								to={
									"https://www.linkedin.com/in/cheerag-routaray/"
								}
								style={{ color: "var(--base-blue)" }}
							>
								LinkedIn
							</Link>
							<br />
							<Link
								to={`mailto:cheeragroutaray@gmail.com`}
								style={{ color: "var(--base-blue)" }}
							>
								Mail
							</Link>
						</div>
					</div>
				</div>
				<div className="col-md-8"></div>
			</div>
		</div>
	);
}

export default About;
