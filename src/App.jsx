import { useState } from "react";
import { FedaCheckoutButton } from 'fedapay-reactjs';

import "./App.css";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [montant, setMontant] = useState(0); // State pour gérer le montant

  const handleChange = (e) => {
    setMontant(e.target.value); 
  };


  const PUBLIC_KEY = 'pk_sandbox_RYZOewwXC6wOFe7xsfjwyBuE';


  const checkoutButtonOptions = {
    public_key: PUBLIC_KEY,
    transaction: {
      amount: montant,
      description: 'Airtime'
    },
    currency: {
      iso: 'XOF'
    },
    button: {
      class: 'bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded',
      text: 'Soumettre'
    },
    onComplete(resp) {
      const FedaPay = window['FedaPay'];
      if (resp.reason === FedaPay.DIALOG_DISMISSED) {
        toast.error('Transaction annulée');
      } else {
        toast.success('Transaction effectuée avec succès');
      }

      toast.success('Transaction effectuée avec succès');
    }
  };



  return (
    <div className="App">
      <Toaster />
      <div className="p-4 space-y-4 max-w-sm mx-auto">
        <label className="block text-gray-700 text-sm font-bold">
          Montant :
          <input
            type="number"
            value={montant}
            onChange={handleChange}
            placeholder="Saisir un montant"
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </label>


        <FedaCheckoutButton options={checkoutButtonOptions} />
      </div>
    </div>
  );
}

export default App;
