import { useState } from "react";
import "./App.css";
import hotpotData from "./hotpotData.json";

export default function App() {
  let hotpot = [...hotpotData];
  const [search, setSearch] = useState("");
  const [btnDist, setBtnDist] = useState("");
  const [btnGroup, setBtnGroup] = useState("");
  const [btnAward, setBtnAward] = useState("");

  return (
    <div className="App">
      <NavBar />
      <Search search={search} setSearch={setSearch} hotpot={hotpot} />
      <Button
        hotpot={hotpot}
        hotpotData={hotpotData}
        btnDist={btnDist}
        setBtnDist={setBtnDist}
        btnGroup={btnGroup}
        setBtnGroup={setBtnGroup}
        btnAward={btnAward}
        setBtnAward={setBtnAward}
      />
      <Stores
        search={search}
        hotpot={hotpot}
        btnDist={btnDist}
        setBtnDist={setBtnDist}
        btnGroup={btnGroup}
        setBtnGroup={setBtnGroup}
        btnAward={btnAward}
        setBtnAward={setBtnAward}
      />
    </div>
  );
}

function NavBar() {
  return (
    <div className="navbar">
      <p>112年度「美食在台北-鍋際大賞」報名店家 </p>
    </div>
  );
}

function Search({ search, setSearch }) {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="請輸入店家或地址"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </div>
  );
}

function Button({
  hotpot,
  btnDist,
  setBtnDist,
  btnGroup,
  setBtnGroup,
  btnAward,
  setBtnAward,
}) {
  function setAttribute(att) {
    const atts = hotpot.map((store) => store[att]);
    const setAtt = [...new Set(atts)];
    return setAtt;
  }

  return (
    <>
      <ButtonItem
        att={setAttribute("Dist")}
        click={btnDist}
        setClick={setBtnDist}
      >
        地區：
      </ButtonItem>
      <ButtonItem
        att={setAttribute("Group")}
        click={btnGroup}
        setClick={setBtnGroup}
      >
        組別：
      </ButtonItem>
      <ButtonItem
        att={["專家評選獎", "人氣票選"]}
        click={btnAward}
        setClick={setBtnAward}
      >
        獎項：
      </ButtonItem>
    </>
  );
}

function ButtonItem({ att, click, setClick, setAtt, children }) {
  return (
    <div className="btns">
      <span>{children}</span>
      {att.map((attri, index) => (
        <button
          key={index}
          className="btn"
          style={click === attri ? { backgroundColor: " #cdc2ac" } : {}}
          onClick={(e) => {
            setClick(
              e.target.textContent !== click ? e.target.textContent : ""
            );
          }}
        >
          {attri}
        </button>
      ))}
    </div>
  );
}

function Stores({ search, hotpot, btnDist, btnGroup, btnAward }) {
  hotpot = hotpotData.filter((store) => {
    return (
      (store.Address.includes(search) || store.Name.includes(search)) &&
      store.Dist.includes(btnDist) &&
      store.Group.includes(btnGroup) &&
      store.Award.includes(btnAward)
    );
  });

  return (
    <div className="center">
      {hotpot.length < 1
        ? "無符合店家"
        : hotpot.map((e) => (
            <div className="store" key={e.id}>
              <p>🍴{e.Name}</p>
              <p>{e.Address}</p>
            </div>
          ))}
    </div>
  );
}
