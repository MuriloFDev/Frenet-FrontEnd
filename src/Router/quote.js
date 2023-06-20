import axios from "axios";
import { useState } from "react";
import { FaPlus, FaTrash, FaTruck } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Flag from "../components/Flag";

const Quote = () => {
  const MySwal = withReactContent(Swal);

  const [data, setData] = useState({
    SellerCEP: "",
    RecipientCEP: "",
    ShippingItemArray: [
      {
        id: 0,
        Height: 0,
        Length: 0,
        Quantity: 0,
        Weight: 0,
        Width: 0,
      },
    ],
    RecipientCountry: "BR",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleQuote = async () => {
    try {
      const vData = {
        SellerCEP: data?.SellerCEP,
        RecipientCEP: data?.RecipientCEP,
        ShippingItemArray: data?.ShippingItemArray,
        RecipientCountry: data?.RecipientCountry,
      };

      const response = await axios.post(
        "https://localhost:7262/Quotation/Quote_Shipping",
        {
          ...vData,
        }
      );

      MySwal.fire({
        title: "Informações de Envio",
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

      toast.success("Cotação realizada com sucesso!");
    } catch (err) {
      console.log(err);
      toast.error("Erro ao realizar cotação!");
    }
  };

  const handleChangeItem = (v, i, n) => {
    const { ShippingItemArray: vItem } = data;

    vItem[i] = {
      ...vItem[i],
      [n]: v,
    };
    setData((prevState) => ({
      ...prevState,
      ShippingItemArray: vItem,
    }));
  };

  const handleAddItem = () => {
    setData((prevState) => {
      return {
        ...prevState,
        ShippingItemArray: data?.ShippingItemArray
          ? [
              ...prevState.ShippingItemArray,
              {
                id: 0,
              },
            ]
          : [
              {
                id: 0,
              },
            ],
      };
    });
  };

  const handleRemoveItem = (index) => {
    setData((prevState) => {
      return {
        ...prevState,
        ShippingItemArray: [
          ...prevState.ShippingItemArray.slice(0, index),
          ...prevState.ShippingItemArray.slice(index + 1),
        ],
      };
    });
  };

  const renderItens = () => {
    return (
      <ul className={`todo-app-list list-group`}>
        {data?.ShippingItemArray &&
          data?.ShippingItemArray.map((item, index) => {
            return (
              <li
                key={`${item.id}-${index}`}
                className="todo-item list-group-item "
              >
                <div className="grid grid-cols-3 gap-3 my-4">
                  <div className="flex flex-col">
                    <label className="form-label">Altura</label>
                    <input
                      onChange={(e) => {
                        handleChangeItem(e.target.value, index, "Height");
                      }}
                      id="Height"
                      className="input input-ghost"
                      value={item.Height}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="form-label">Largura</label>
                    <input
                      onChange={(e) => {
                        handleChangeItem(e.target.value, index, "Width");
                      }}
                      id="Width"
                      className="input input-ghost"
                      value={item.Width}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="form-label">Comprimento</label>
                    <input
                      onChange={(e) => {
                        handleChangeItem(e.target.value, index, "Length");
                      }}
                      id="Length"
                      className="input input-ghost"
                      value={item.Length}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="form-label">Quantidade</label>
                    <input
                      onChange={(e) => {
                        handleChangeItem(e.target.value, index, "Quantity");
                      }}
                      id="Quantity"
                      className="input input-ghost"
                      value={item.Quantity}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="form-label">Peso</label>
                    <input
                      onChange={(e) => {
                        handleChangeItem(e.target.value, index, "Weight");
                      }}
                      id="Weight"
                      className="input input-ghost"
                      value={item.Weight}
                    />
                  </div>
                </div>
                <div className="todo-item-action mt-2">
                  <button
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveItem(index);
                    }}
                  >
                    <FaTrash className="font-medium-3 text-danger cursor-pointer" />
                    Remover produto #{index + 1}
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
    );
  };

  return (
    <div className="flex justify-center items-center w-full z-10">
      <div className="max-w-4xl bg-white shadow-black/40 shadow-2xl w-full p-10 rounded-xl">
        <h1 className="text-black text-2xl">Calculadora de Fretes</h1>
        <div className="my-10">
          <div className="flex justify-between items-center">
            <div className="flex flex-col w-auto">
              <label htmlFor="RecipientCEP">Digite o cep de origem</label>
              <input
                type="text"
                id="RecipientCEP"
                placeholder="CEP"
                className="input input-ghost"
                name="RecipientCEP"
                value={data?.RecipientCEP ?? ""}
                onChange={handleChange}
              />
            </div>
            <FaTruck size={80} className="text-black" />
            <div className="flex flex-col w-auto">
              <label htmlFor="SellerCEP">Digite o cep de origem</label>
              <input
                type="text"
                id="SellerCEP"
                placeholder="CEP"
                className="input input-ghost"
                name="SellerCEP"
                value={data?.SellerCEP ?? ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col max-w-md mx-auto my-4">
            <label htmlFor="RecipientCountry">País de entrega</label>
            <Flag
              value={data?.RecipientCountry ?? "BR"}
              onChange={(e) => {
                handleChange({
                  target: {
                    name: "RecipientCountry",
                    value: e?.value ?? "BR",
                  },
                });
              }}
            />
          </div>

          {renderItens()}

          <div className="flex w-full justify-between mt-10">
            <button
              className="btn btn-success"
              onClick={(e) => {
                e.preventDefault();
                handleAddItem();
              }}
            >
              <FaPlus className="font-medium-3 cursor-pointer" />
              <span className="ms-25">Adicionar produto</span>
            </button>

            <button className="btn btn-success" onClick={handleQuote}>
              Cotar preço
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
