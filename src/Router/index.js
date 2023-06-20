import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex justify-center items-center w-full z-10">
      <div className="max-w-4xl bg-white shadow-black/40 shadow-2xl w-full p-10 rounded-xl">
        <div className="grid grid-cols-2 gap-5">
          <div className="card border border-gray-500 hover:scale-105 transition-all duration-300">
            <div className="card-body">
              <h1>Realizar cotação de frete</h1>
              <span>
                Simular frete com desconto é fácil e rápido. Frete sem
                burocracia.
              </span>
              <Link to="/quote">
                <button className="btn btn-info text-white">
                  Cotação de frete
                </button>
              </Link>
            </div>
          </div>

          <div className="card border border-gray-500 hover:scale-105 transition-all duration-300">
            <div className="card-body">
              <h1>Consultar últimas cotações</h1>
              <span>
                Consulte as últimas cotações de frete realizadas em nossa base
              </span>
              <Link to="/consult">
                <button className="btn btn-info text-white">Consultar</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
