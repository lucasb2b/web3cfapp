"use client";
import { client } from "@/app/client";
import TierCard from "@/app/Components/TierCard";
import { useParams } from "next/navigation";
import { getContract } from "thirdweb";
import { bscTestnet } from "thirdweb/chains";
import { useReadContract } from "thirdweb/react";

export default function CampaignPage() {
  const { campaignAddress } = useParams();

  const contract = getContract({
    client: client,
    chain: bscTestnet,
    address: campaignAddress as string,
  });

  const { data: name, isPending: isPendingName } = useReadContract({
    contract: contract,
    method: "function name() view returns (string)",
    params: [],
  });

  const { data: description } = useReadContract({
    contract,
    method: "function description() view returns (string)",
    params: [],
  });

  const { data: deadline, isPending: isPendingDeadLine } = useReadContract({
    contract: contract,
    method: "function deadline() view returns (uint256)",
    params: [],
  });

  const deadlineDate = new Date(
    parseInt(deadline?.toString() as string) * 1000,
  );
  const deadlineDatePassed = deadlineDate < new Date();

  const { data: goal, isPending: isPendingGoal } = useReadContract({
    contract: contract,
    method: "function goal() view returns (uint256)",
    params: [],
  });

  const { data: balance, isPending: isPendingBalance } = useReadContract({
    contract: contract,
    method: "function getContractBalance() view returns (uint256)",
    params: [],
  });

  const totalBalance = balance?.toString();
  const totalGoal = goal?.toString();
  let balancePercentage =
    (parseInt(totalBalance as string) / parseInt(totalGoal as string)) * 100;

  if (balancePercentage >= 100) {
    balancePercentage = 100;
  }

  const { data: tiers, isPending: isPendingTiers } = useReadContract({
    contract: contract,
    method:
      "function getTiers() view returns ((string name, uint256 amount, uint256 backers)[])",
    params: [],
  });

  const { data: owner, isPending: isPendingOwner } = useReadContract({
    contract: contract,
    method: "function owner() view returns (address)",
    params: [],
  });

  const { data: status } = useReadContract({
    contract,
    method: "function state() view returns (uint8)",
    params: [],
  });

  return (
    <div className="mx-auto max-w-7xl px-2 mt-4 sm:px-6 lg:px-8">
      <div className="flex flex-row justify-between items-center">
        {!isPendingName && <p className="text-4xl font-semibold">{name}</p>}
      </div>
      <div className="my-4">
        <p className="text-lg font-semibold">Description:</p>
        <p>{description}</p>
      </div>
      <div className="mb-4">
        <p className="text-lg font-semibold">Deadline</p>
        {!isPendingDeadLine && <p>{deadlineDate.toDateString()}</p>}
      </div>
      {!isPendingBalance && !isPendingGoal && (
        <div className="mb-4">
          <p className="text-lg font-semibold">
            Campaign Goal: ${goal?.toString()}
          </p>
          <div className="relative w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
            <div
              className="h-6 bg-blue-600 rounded-full dark:bg-blue-500 text-right"
              style={{ width: `${balancePercentage?.toString()}%` }}
            >
              <p className="text-white dark:text-white text-xs p-1">
                ${balance?.toString()}
              </p>
            </div>
            <p className="absolute top-0 right-0 text-white dark:text-white text-xs p-1">
              {balancePercentage >= 100
                ? ""
                : `${balancePercentage?.toString()}%`}
            </p>
          </div>
        </div>
      )}
      <div>
        <p className="text-lg font-semibold">Tiers:</p>
        <div className="grid grid-cols-3 gap-4">
          {isPendingTiers ? (
            <p>Loading...</p>
          ): (
            tiers && tiers.length > 0 ? (
              tiers.map((tier, index) => (
                <TierCard 
                  key={index}
                  tier={tier}
                  index={index}
                  contract={contract}
                />
              ))
            ) : (
              <p>No tiers avaible</p>
            )
          )}
        </div>
      </div>
    </div>
  );
}
