"use client";

import { useState, useMemo } from "react";
import Tree from "react-d3-tree";

// Input flat node type
type FlatNode = {
  id: string;
  name: string;
  relation: string;
  health: string[];
  parentIds: string[] | null;
};

// D3 tree node structure
type D3Node = {
  name: string;
  attributes?: Record<string, string>;
  children?: D3Node[];
};
function buildForestD3(flat: FlatNode[]): D3Node[] {
  const idMap: Record<string, D3Node & { id: string; parentIds: string[] }> =
    {};
  const childParentLinks = new Map<string, string>(); // childId -> chosen parentId

  // Step 1: initialize node map
  flat.forEach((node) => {
    idMap[node.id] = {
      id: node.id,
      name: node.name,
      attributes: {
        relation: node.relation,
        ...(node.health.length > 0 && { health: node.health.join("; ") }),
      },
      children: [],
      parentIds: node.parentIds?.filter((id) => id !== "unknown") ?? [],
    };
  });

  // Step 2: attach each child to only *one* parent to avoid duplication
  flat.forEach((node) => {
    const child = idMap[node.id];
    const validParents = child.parentIds ?? [];
    for (const pid of validParents) {
      if (!childParentLinks.has(child.id) && idMap[pid]) {
        idMap[pid].children!.push(child);
        childParentLinks.set(child.id, pid);
        break; // attach to first available parent
      }
    }
  });

  // Step 3: identify root nodes (those not attached)
  const roots = flat
    .filter((n) => !childParentLinks.has(n.id))
    .map((n) => idMap[n.id]);

  return roots.map((r) => JSON.parse(JSON.stringify(r)));
}

export default function FamilyTree() {
  const [input, setInput] = useState("");
  const [nodes, setNodes] = useState<D3Node[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNodes(null);
    setError(null);
    setLoading(true);

    try {
      // const res = await fetch("/api/tree", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ messages: [{ role: "user", content: input }] }),
      // });

      // const json = await res.json();'
      const json: FlatNode[] = [
        {
          id: "elena",
          name: "Elena",
          relation: "Self",
          health: [],
          parentIds: ["maria", "carlos"],
        },
        {
          id: "maria",
          name: "Maria Lopez",
          relation: "mother",
          health: ["type 2 diabetes"],
          parentIds: ["antonio", "unknown"],
        },
        {
          id: "antonio",
          name: "Antonio",
          relation: "grandfather",
          health: ["lung cancer"],
          parentIds: null,
        },
        {
          id: "carlos",
          name: "Carlos Rivera",
          relation: "father",
          health: ["mild heart attack"],
          parentIds: ["rosa", "jorge"],
        },
        {
          id: "rosa",
          name: "Rosa",
          relation: "grandmother",
          health: ["breast cancer"],
          parentIds: null,
        },
        {
          id: "jorge",
          name: "Jorge",
          relation: "grandfather",
          health: [],
          parentIds: null,
        },
        {
          id: "sofia",
          name: "Sofia",
          relation: "daughter",
          health: [],
          parentIds: ["elena", "unknown"],
        },
        {
          id: "miguel",
          name: "Miguel",
          relation: "brother",
          health: [],
          parentIds: ["maria", "carlos"],
        },
      ]; // For testing purposes, replace with the above line
      if (!Array.isArray(json)) throw new Error("Invalid response structure");
      setNodes(buildForestD3(json));
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const treeData = useMemo(() => nodes ?? [], [nodes]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Family Tree Extractor</h1>

      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
          placeholder="Describe your family's relationships..."
          className="w-full border border-gray-300 rounded p-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Extracting..." : "Submit"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {treeData.length > 0 && (
        <div className="h-[600px] mt-6 border rounded shadow bg-white">
          <Tree
            data={treeData}
            orientation="vertical"
            separation={{ siblings: 1, nonSiblings: 2 }}
          />
        </div>
      )}
    </div>
  );
}
const json = [
  {
    id: "elena",
    name: "Elena",
    relation: "Self",
    health: [],
    parentIds: ["maria", "carlos"],
  },
  {
    id: "maria",
    name: "Maria Lopez",
    relation: "mother",
    health: ["type 2 diabetes"],
    parentIds: ["antonio", "unknown"],
  },
  {
    id: "antonio",
    name: "Antonio",
    relation: "grandfather",
    health: ["lung cancer"],
    parentIds: null,
  },
  {
    id: "carlos",
    name: "Carlos Rivera",
    relation: "father",
    health: ["mild heart attack"],
    parentIds: ["rosa", "jorge"],
  },
  {
    id: "rosa",
    name: "Rosa",
    relation: "grandmother",
    health: ["breast cancer"],
    parentIds: null,
  },
  {
    id: "jorge",
    name: "Jorge",
    relation: "grandfather",
    health: [],
    parentIds: null,
  },
  {
    id: "sofia",
    name: "Sofia",
    relation: "daughter",
    health: [],
    parentIds: ["elena", "unknown"],
  },
  {
    id: "miguel",
    name: "Miguel",
    relation: "brother",
    health: [],
    parentIds: ["maria", "carlos"],
  },
];
