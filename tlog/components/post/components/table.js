export const Table = p => (
  <div className="table-container">
    <table {...p} />
    <style jsx>{`
      .table-container {
        display: flex;
        justify-content: center;
        width: 100%;
        margin: 1.5rem 0;
      }
      table {
        display: block;
        overflow: auto;
        border-collapse: collapse;
      }
    `}</style>
  </div>
);

export const Thead = p => <thead {...p} />;

export const Tbody = p => <tbody {...p} />;

export const Tr = p => <tr {...p} />;

export const Th = p => (
  <>
    <th {...p} />
    <style jsx>{`
      th {
        font-weight: 600;
        padding: 0.5rem 0.875rem;
        border: 1px solid var(--accents-2);
      }
    `}</style>
  </>
);

export const Td = p => (
  <>
    <td {...p} />
    <style jsx>{`
      td {
        padding: 0.5rem 0.875rem;
        border: 1px solid var(--accents-2);
      }
    `}</style>
  </>
);
