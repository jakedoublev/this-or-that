import { useState } from "react";
import { OptionsInput } from "./components/OptionsInput";
import { TournamentSort } from "./components/TournamentSort";
import { SortedView } from "./components/SortedView";
import "./App.css";

enum PAGES {
  INPUT = 1,
  SORT,
  VIEW,
}

function App() {
  const [page, setPage] = useState(PAGES.INPUT);
  const [options, setOptions] = useState([""]);

  const renderPage = () => {
    switch (page) {
      case PAGES.INPUT:
        return <OptionsInput advancePage={() => setPage(PAGES.SORT)} options={options} setOptions={setOptions} />;
      case PAGES.SORT:
        return (
          <TournamentSort
            options={options}
            onSortComplete={(sorted: string[]) => {
              setOptions(sorted);
              setPage(PAGES.VIEW);
            }}
          />
        );
      case PAGES.VIEW:
        return <SortedView options={options} />;
      default:
        return null; // Handle invalid pages
    }
  };
  return (
    <>
      <h1>This Or That</h1>
      {renderPage()}
    </>
  );
}

export default App;
