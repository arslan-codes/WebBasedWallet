const Hero = () => {
  return (
    <div className="hero bg-warning min-h-2.5">
      <div className="hero-content flex-col lg:flex-row w-full justify-between">
        <div className=" lg:text-left">
          <h1 className="text-7xl font-bold">Crypto Web Wallet</h1>
          <p className="py-6">
            A crypto wallet generated with advanced Hashing and Cryptogrpahic
            Techniquies
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body">
            <label className="text-2xl">Enter the Wallet Address</label>
            <div className="form-control">
              <input
                type="text"
                placeholder="0x4DSIRJ342353453454"
                className="input input-bordered"
                required
              />
            </div>

            <div className="stats shadow bg-base-300 text-white">
              <div className="stat text-white">
                <div className="stat-title text-white">Balance</div>
                <div className="stat-value">0.00</div>
                <div className="stat-desc text-white">CUR</div>
              </div>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-success">Check Balance</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Hero;
