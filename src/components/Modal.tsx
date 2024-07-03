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
			{children}
			<button
				className="bg-slate-700 px-2 py-1 text-sm rounded"
				onClick={onClose}
			>
				Close
			</button>
		</Portal>
	);
};

export default Modal;
