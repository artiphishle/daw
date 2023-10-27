const styles = {
  button: {
    navbar:
      'mr-1 w-11 h-11 p-2 bg-[#333] rounded-xs cursor-pointer hover:bg-[#222]',
  },
  dialog:
    'flex flex-col shadow-2xl p-4 w-22 absolute top-0 left-0 right-0 bottom-0',
  headings: {
    h1: 'text-3xl font-black',
    h2: 'text-2xl font-bold',
    h3: 'text-xl font-semibold',
  },
  icon: 'w-[16px] h-[16px] mr-1',
  main: 'relative h-full flex flex-1 justify-between',

  /*** @components */
  arranger: { main: 'relative' },
  avatar: {
    main: 'flex items-center justify-center bg-[#222] text-white cursor-pointer w-12 h-12 hover:rotate-180',
    bordered: 'border border-gray-600',
    rounded: 'rounded-full',
    icon: 'w-8 h-8',
  },
  browser: {
    a: 'p-2 border border-gray-600',
    main: 'w-4 h-4 mr-2',
    fileStyle: 'fill-green-200',
    folderStyle: 'fill-blue-200',
    liStyle: 'flex',
  },
  locator: 'bg-black w-[1px] absolute top-0 bottom-0',
  mixer: {
    main: 'bg-[#3e4140] flex w-full text-white pl-[184px]',
    inner: 'flex w-full items-center',
    meter: 'w-full bg-[#333]',
    track: {
      main: 'pt-6 bg-[#3e4140] border border-r-[#555] border-r-[2px] justify-center text-xs items-center content-end relative',
      channel: 'justify-end bg-green-700',
      inner: 'flex px-4 items-center gap-1 py-2 border-b border-b-[#555]',
      master:
        'bg-[#3e4140] border border-r-[#555] border-r-[2px] h-full flex flex-col justify-end',
      active: 'font-bold',
      inactive: '',
    },
  },
  navbar: {
    ui: 'p-4 flex flex-row w-full bg-black text-white items-center justify-between',
    uiInner: 'flex px-4 py-2',
    icon: 'w-8 h-8 mr-2',
  },
  notes: {
    main: 'flex flex-1 justify-center items-center mr-1 text-black text-center cursor-pointer text-[0.5rem]',
    bg: 'bg-transparent',
    bgActive: 'bg-blue-900 text-white',
  },
  time: {
    main: 'flex flex-1 items-center px-1 py-2 border-l border-r-gray-200',
  },
  track: {
    audio: { main: 'w-full flex flex-col justify-center' },
    time: 'flex w-full bg-white text-gray-500 text-xs',
    active: 'font-bold text-black',
    col1: {
      active: 'bg-[blue]',
      main: 'flex justify-between items-center px-4 pl-8 bg-white',
      name: 'whitespace-nowrap w-28 overflow-x-hidden text-ellipsis',
    },
    col2: {
      main: 'relative flex w-full',
    },
    icon: 'fill-white w-6 h-6', // TODO not white
    row: 'relative flex w-full h-10 text-black mb-[1px] first:text-gray-400 first:mb-0 text-xs',
  },
  transport: {
    main: 'flex px-4',
    inner: 'flex gap-2',
    control: 'flex items-center text-white px-4 mx-2 border-r border-r-[#555]',
    settings: {
      main: 'text-xs flex flex-col justify-between',
      inner: 'flex',
      input: 'ml-1 bg-transparent',
      item: 'flex items-center',
      label: 'text-cyan-300',
      position: 'text-[#fff] text-lg',
    },
  },
};

export default styles;
