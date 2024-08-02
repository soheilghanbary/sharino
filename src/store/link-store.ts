import { arrayMove } from "@dnd-kit/sortable";
import { create } from "zustand";

interface LinkState {
  links: LinkProps[];
  addLink: ({ name, url }: { name: string; url: string }) => void;
  updateLink: (id: string, name: string, url: string) => void;
  moveLink: (activeId: string, overId: string) => void;
  deleteLink: (id: string) => void;
  setLinks: (links: LinkProps[]) => void;
}

export const useLinkStore = create<LinkState>((set) => ({
  links: [],
  addLink: (values) =>
    set((state) => ({
      links: [
        ...state.links,
        { id: new Date().getTime().toString(), ...values },
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
  deleteLink: (id) =>
    set((state) => ({
      links: state.links.filter((link) => link.id !== id),
    })),
  setLinks: (links) => set({ links }),
}));
