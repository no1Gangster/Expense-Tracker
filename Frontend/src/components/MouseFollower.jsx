import React, { useState, useEffect } from "react";

const MouseFollower = () => {
	const [cursorX, setCursorX] = useState(0);
	const [cursorY, setCursorY] = useState(0);
	const windowWidth = window.innerWidth;
	const windowHeight = window.innerHeight;
	const followerSize = 50; // Adjust this value as needed for your follower element size

	const handleMouseMove = (event) => {
		let newCursorX = event.clientX;
		let newCursorY = event.clientY;

		// Limit X position to stay within window bounds
		newCursorX = Math.min(
			Math.max(0, newCursorX),
			windowWidth - followerSize
		);

		// Limit Y position to stay within window bounds
		newCursorY = Math.min(
			Math.max(0, newCursorY),
			windowHeight - followerSize
		);

		setCursorX(newCursorX);
		setCursorY(newCursorY);
	};

	useEffect(() => {
		window.addEventListener("mousemove", handleMouseMove);

		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	const styles = {
		top: cursorY,
		left: cursorX,
		position: "absolute",
		pointerEvents: "none",
	};

	return (
		<div
			className="blob"
			style={styles}
		></div>
	);
};

export default MouseFollower;
