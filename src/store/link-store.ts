import { arrayMove } from "@dnd-kit/sortable";
import { create } from "zustand";

interface Link {
  id: string;
  name: string;
  url: string;
}

interface LinkState {
  links: Link[];
  addLink: () => void;
  updateLink: (id: string, name: string, url: string) => void;
  moveLink: (activeId: string, overId: string) => void;
}

export const useLinkStore = create<LinkState>((set) => ({
  links: [],
  addLink: () =>
    set((state) => ({
      links: [
        ...state.links,
        { id: new Date().getTime().toString(), name: "", url: "" },
      ],
    })),
  updateLink: (id, name, url) =>
    set((state) => ({
      links: state.links.map((link) =>
        link.id === id ? { ...link, name, url } : link
      ),
    })),
  moveLink: (activeId, overId) =>
    set((state) => {
      const oldIndex = state.links.findIndex((link) => link.id === activeId);
      const newIndex = state.links.findIndex((link) => link.id === overId);
      return {
        links: arrayMove(state.links, oldIndex, newIndex),
      };
    }),
}));
