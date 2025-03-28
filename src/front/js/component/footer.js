import React from "react";

export const Footer = () => (
	<footer className=" static flex flex-col items-center mt-40 py-3 text-center w-full">
		<div className="absolute bottom-0 pb-5">
			<div>
				<span className="text-gray-500">© 2025 Pill Check. All rights reserved.</span>
			</div>

			<div>
				<a href="/privacy-policy" className="text-gray-500 hover:text-gray-700">Privacy Policy</a> |
				<a href="/terms-of-service" className="text-gray-500 hover:text-gray-700 ml-2">Terms of Service</a>
			</div>
		</div>
	</footer>
);
