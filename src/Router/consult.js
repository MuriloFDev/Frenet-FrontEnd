import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Consult = () => {
  const MySwal = withReactContent(Swal);
  const [freight, setFreight] = useState();

  const handleConsult = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7262/Quotation/QuoteByFreight/" + freight
      );

      MySwal.fire({
        title: `Últimas ${response.data.length} cotações`,
        icon: "success",
        html: response.data.map((item, index) => {
          return `<div class="text-start font-semibold">
                    <p>#${index + 1}</p>
                    <p>Transportadora: ${item.carrier}</p>
                    <p>Código da Transportadora: ${item.carrierCode}</p>
                    <p>Prazo de Entrega: ${item.deliveryTime}</p>
                    <p>Mensagem: ${item.msg}</p>
                    <p>Código do Serviço: ${item.serviceCode}</p>
                    <p>Descrição do Serviço: ${item.serviceDescription}</p>
                    <p>Preço do Envio: R$${item.shippingPrice}</p>
                </div>`;
        }),
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Ótimo!',
        confirmButtonAriaLabel: "Thumbs up, great!",
      });

      toast.success("Consulta realizada com sucesso!");
    } catch (err) {
      console.log(err);
      toast.error("Erro ao realizar Consulta!");
    }
  };

  return (
    <div className="flex justify-center items-center w-full z-10">
      <div className="max-w-4xl bg-white shadow-black/40 shadow-2xl w-full p-10 rounded-xl">
        <h1 className="text-black text-2xl">Consultar cotações</h1>

        <div className="flex flex-col w-auto my-5">
          <label htmlFor="RecipientCEP">Digite o cep</label>
          <input
            type="text"
            id="freight"
            placeholder="CEP"
            className="input input-ghost"
            name="freight"
            value={freight ?? ""}
            onChange={(e) => setFreight(e.target.value)}
          />
        </div>
        <div className="flex w-full justify-between mt-10">
          <button className="btn btn-success" onClick={handleConsult}>
            Consultar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Consult;
