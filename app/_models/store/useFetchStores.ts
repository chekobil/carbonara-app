let dataLength: number = 0;
export function useFetchStores() {
  const fetchStores = async (page: number, query: string = "") => {
    console.info("fetchStores, page", page, "with query", query);
    const itemsPerPage = 30;
    const sliceStart = (page - 1) * itemsPerPage;
    const sliceEnd = page * itemsPerPage;
    let dataRaw: {
      default: any[];
    } | null = await import("~/_models/store/stores.json");
    let data: any[] = dataRaw.default;
    if (Boolean(query)) {
      data = dataRaw.default.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    dataLength = data.length;
    const maxPage: number = Math.ceil(dataLength / itemsPerPage);
    const dataPaginated = data.slice(sliceStart, sliceEnd);
    data = [];
    if (page > maxPage) {
      return { data: [], total: dataLength };
    }
    return { data: dataPaginated, total: dataLength };
  };
  return {
    fetchStores,
  };
}
