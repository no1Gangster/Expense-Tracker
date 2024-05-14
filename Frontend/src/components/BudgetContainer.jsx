import React, { useEffect, useState } from "react";
import BudgetModal from "./BudgetModal";
import budget from "../ApiService/Budget";
import { useAuth } from "../Context/AuthContext";

function BudgetContainer() {
	const authContext = useAuth();
	const { id } = authContext;

	const [addMsg, setAddMsg] = useState("Add");
	const [update, setUpdate] = useState(0);
    
    const [showModal, setShowModal] = useState(false);
    const [budgetData, setBudgetData] = useState("");
    const [userBudget, setUserBudget] = useState(null);
    const [budgetRange, setBudgetRange] = useState('');

	async function getBudget() {
		if (id && id.length == 24) {
			let res = await budget.getBudgetDetails(id);

			if (res.status) {
				formatMsg(res.data.budgetStatus);
                setUserBudget(res.data.userBudget);
				setAddMsg("Update");
                setBudgetRange(res.data.budgetStatus.split('between')[1].split('.')[0]);
			}
		}
	}

	function refreshPage() {
		setUpdate(update + 1);
	}

	useEffect(() => {
		getBudget();
	}, [id, update]);


	const formatMsg = (val) => {
		let l1 = val.split("set")[0];
		+".";
		let l2 = val.split(".")[1] + val.split(".")[2];
		if (l2) setBudgetData(l1 + "\n" + l2);
		else setBudgetData(l1);
	};

	return (
		<div>
            <h2>Budget Status</h2>
			<div>{budgetData}</div>
			<br />
			<div>{userBudget && `Budget : ${userBudget}`}</div>
			<div>{budgetRange && `Budget Duration : ${budgetRange}`}</div>
			<br />
			{showModal && (
				<BudgetModal
					update={refreshPage}
					showModal={setShowModal}
					msg={addMsg}
				/>
			)}
			<button
				className="btn btn-light"
				onClick={() => setShowModal(true)}
			>
				{addMsg} Budget
			</button>
		</div>
	);
}

export default BudgetContainer;
