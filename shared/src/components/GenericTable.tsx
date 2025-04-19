import { Table } from "@shared/components/NewTable";
import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface ColumnProps<T> {
  key: keyof T | string;
  header: string;
  colSpan?: number;
  className?: string;
  render?: (item: T) => ReactNode;
}

interface GenericTableProps<T> {
  data: T[];
  columns: ColumnProps<T>[];
  className?: string;
  gridColumns?: number;
  noDataMessage?: string;
  onRowClick?: (rowData: T, rowIndex: number) => void;
}

const getNestedValue = (obj: any, path: string): any => {
  return path.split(".").reduce((acc, key) => (acc ? acc[key] : "-"), obj);
};

const GenericTable = <T,>({
  data,
  columns,
  className,
  gridColumns = 12,
  noDataMessage = "No data available",
  onRowClick,
}: GenericTableProps<T>): JSX.Element => {
  const validatedGridColumns = Math.max(gridColumns, 1);

  return (
    <Table.Root
      className={twMerge("flex flex-col bg-transparent h-full", className)}
    >
      <Table.Head>
        <Table.Row
          className="lg:last:border-b"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${validatedGridColumns}, 1fr)`,
          }}
        >
          {columns.map((column, index) => (
            <Table.HeaderCell
              key={
                typeof column.key === "string" ? column.key : `header-${index}`
              }
              className={twMerge("truncate", column.className)}
              style={{
                gridColumn: `span ${Math.min(
                  column.colSpan || 1,
                  validatedGridColumns
                )} / span ${Math.min(
                  column.colSpan || 1,
                  validatedGridColumns
                )}`,
              }}
            >
              {column.header}
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {data.length === 0 && (
          <Table.Row
            style={{
              gridColumn: `span ${validatedGridColumns} / span ${validatedGridColumns}`,
            }}
          >
            {noDataMessage}
          </Table.Row>
        )}

        {data.length > 0 &&
          data.map((row, rowIndex) => (
            <Table.Row
              key={`row-${rowIndex}`}
              className={onRowClick ? "cursor-pointer" : ""}
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${validatedGridColumns}, 1fr)`,
              }}
              onClick={() => onRowClick?.(row, rowIndex)}
            >
              {columns.map((column, colIndex) => (
                <Table.Cell
                  key={
                    typeof column.key === "string"
                      ? column.key
                      : `col-${colIndex}`
                  }
                  className={twMerge("truncate", column.className)}
                  style={{
                    gridColumn: `span ${Math.min(
                      column.colSpan || 1,
                      validatedGridColumns
                    )} / span ${Math.min(
                      column.colSpan || 1,
                      validatedGridColumns
                    )}`,
                  }}
                >
                  {column.render
                    ? column.render(row)
                    : String(
                        typeof column.key === "string"
                          ? getNestedValue(row, column.key)
                          : "-"
                      )}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
      </Table.Body>
    </Table.Root>
  );
};

GenericTable.displayName = "GenericTable";
export default GenericTable;
