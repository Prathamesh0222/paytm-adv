import { Card } from "@repo/ui/card";

const getStatement = (status: string) => {
  if (status === "success") {
    return "Received INR";
  } else if (status === "failed") {
    return "Failed";
  } else {
    return "To be Received INR";
  }
};

export const OnRampTransaction = ({
  transactions,
  title = "Recent Transactions",
}: {
  transactions: {
    time: Date;
    amount: number;
    status: string;
    provider: string;
  }[];
  title?: string;
}) => {
  if (!transactions.length) {
    return (
      <Card title={title}>
        <div className="">No {title}</div>
      </Card>
    );
  }
  return (
    <Card title={title}>
      <div className="pt-2">
        {transactions.map((t) => (
          <div className="flex justify-between">
            <div>
              <div className="text-sm">{getStatement(t.status)}</div>
              <div className="text-slate-600 text-xs">
                {t.time.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              + Rs {t.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
