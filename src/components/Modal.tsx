import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }: { children: React.ReactNode }) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		return () => setMounted(false);
	}, []);

	if (!mounted) return null;
	return createPortal(children, document.getElementById("portal")!);
};

const Modal = ({
	children,
	onClose,
}: {
	children: React.ReactNode;
	onClose: () => void;
}) => {
	return (
		<Portal>
			<aside className="container">
				{children}
				<button className="bg-slate-700" onClick={onClose}>
					Close
				</button>
			</aside>
		</Portal>
	);
};

export default Modal;
