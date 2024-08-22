const BalanceCheck = () => {
  return (
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
  );
};

export default BalanceCheck;
