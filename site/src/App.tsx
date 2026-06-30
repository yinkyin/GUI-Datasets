import { useMemo, useState } from "react";
import "./App.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CompareBar } from "@/components/CompareBar";
import { DatasetDetail } from "@/components/DatasetDetail";
import { Hero } from "@/sections/Hero";
import { Overview } from "@/sections/Overview";
import { ClassifierLab } from "@/sections/ClassifierLab";
import { Catalog } from "@/sections/Catalog";
import { CompareWorkspace } from "@/sections/CompareWorkspace";
import { UseCases } from "@/sections/UseCases";
import { useCatalogState } from "@/hooks/use-catalog-state";
import { catalogTotals, filterAndSort, getById } from "@/data/selectors";
import type { GuiDataset } from "@/types/dataset";

function App() {
  const { filters, setFilters, compareIds, setCompareIds, view, setView, clearFilters, toggleCompare } = useCatalogState();
  const [activeDataset, setActiveDataset] = useState<GuiDataset | null>(null);

  const totals = catalogTotals();
  const results = useMemo(() => filterAndSort(filters), [filters]);
  const compared = useMemo(
    () => compareIds.map((id) => getById(id)).filter((d): d is GuiDataset => Boolean(d)),
    [compareIds]
  );

  function scrollToCompare() {
    document.getElementById("compare")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="aurora-bg" />
      <Navbar />

      <main>
        <Hero count={totals.count} />
        <Overview />
        <ClassifierLab />
        <Catalog
          filters={filters}
          setFilters={setFilters}
          view={view}
          setView={setView}
          results={results}
          total={totals.count}
          compareIds={compareIds}
          onOpen={setActiveDataset}
          onCompare={toggleCompare}
          onClear={clearFilters}
        />
        <CompareWorkspace selected={compared} onRemove={toggleCompare} />
        <UseCases />
      </main>

      <Footer count={totals.count} />

      <CompareBar
        selected={compared}
        onRemove={toggleCompare}
        onClear={() => setCompareIds([])}
        onView={scrollToCompare}
      />

      <DatasetDetail
        dataset={activeDataset}
        compared={activeDataset ? compareIds.includes(activeDataset.id) : false}
        onClose={() => setActiveDataset(null)}
        onCompare={toggleCompare}
      />
    </div>
  );
}

export default App;
