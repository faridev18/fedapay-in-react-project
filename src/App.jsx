import { useState } from "react";
import { FedaCheckoutButton } from "fedapay-reactjs";
import toast, { Toaster } from "react-hot-toast";

import "./App.css";

const PUBLIC_KEY = "pk_sandbox_RYZOewwXC6wOFe7xsfjwyBuE";

// Composant de paiement avec FedaCheckoutButton
function PaymentComponent({ amount }) {
  const checkoutButtonOptions = {
    public_key: PUBLIC_KEY,
    transaction: {
      amount: amount,
      description: "Paiement personnalisé",
    },
    currency: {
      iso: "XOF",
    },
    button: {
      class: "bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded",
      text: "Payer maintenant",
    },
    onComplete(resp) {
      const FedaPay = window["FedaPay"];
      if (resp.reason === FedaPay.DIALOG_DISMISSED) {
        toast.error("Transaction annulée");
      } else {
        toast.success("Transaction effectuée avec succès");
      }

      console.log(resp);
    },
  };

  return (
    <div className="mt-4">
      <FedaCheckoutButton options={checkoutButtonOptions} />
    </div>
  );
}

// Composant principal avec formulaire
function App() {
  const [montant, setMontant] = useState("");
  const [confirmedAmount, setConfirmedAmount] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(montant);
    if (!parsedAmount || parsedAmount <= 0) {
      toast.error("Veuillez saisir un montant valide.");
      return;
    }
    setConfirmedAmount(parsedAmount);
  };

  return (
    <div className="App p-4 max-w-sm mx-auto">
      <Toaster />

      {!confirmedAmount ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-gray-700 text-sm font-bold">
            Montant :
            <input
              type="number"
              value={montant}
              onChange={(e) => setMontant(e.target.value)}
              placeholder="Saisir un montant"
              className="mt-1 p-2 w-full border border-gray-300 rounded"
            />
          </label>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded w-full"
          >
            Valider
          </button>
        </form>
      ) : (
        <PaymentComponent amount={confirmedAmount} />
      )}
    </div>
  );
}

export default App;
