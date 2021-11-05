export const generateScaffoldingArray = levels => {
  const ALERT_STATUS = 'ALERT';
  const ACTIVE_STATUS = 'ACTIVE';
  const PAUSE_STATUS = 'PAUSE';
  const CHECK_STATUS = 'CHECK';

  //find maxLevel, maxBay
  let maxOfLevel = 0;
  let maxOfBay = 0;
  levels.forEach(element => {
    const {name, props} = element;
    if (name && parseInt(name) > maxOfLevel) {
      maxOfLevel = parseInt(name);
    }

    //TODO: Change to correct numberOfBays field name
    if (props && props.numberOfBays && props.numberOfBays > maxOfBay) {
      maxOfBay = parseInt(props.numberOfBays);
    }
  });

  //create empty Scaffolding
  const scaffolding = Array(maxOfLevel)
    .fill(null)
    .map(() => Array(maxOfBay).fill({isEmpty: true}));

  const statusProcessor = (latestStatus, currentStatus) => {
    if (latestStatus == ALERT_STATUS || currentStatus == ALERT_STATUS)
      return ALERT_STATUS;
    if (latestStatus == PAUSE_STATUS || currentStatus == PAUSE_STATUS)
      return PAUSE_STATUS;
    if (latestStatus == CHECK_STATUS || currentStatus == CHECK_STATUS)
      return CHECK_STATUS;
    return ACTIVE_STATUS;
  };

  const sideProcessor = sides =>
    sides !== undefined
      ? sides.reduce(
          (prev, cur) => {
            if (cur.projectNodes.length == 0) return prev;

            return {
              ...prev,
              status: statusProcessor(prev.status, cur.projectNodes[0].status),
              projectNodes: {
                ...prev.projectNodes,
                [cur.name]: cur.projectNodes[0],
              },
            };
          },
          {status: 'active'},
        )
      : '';

  //Fill in the node
  levels.forEach(level => {
    const {name: levelNo, children} = level;
    children.forEach(bay => {
      const {name: bayNo, children: sides} = bay;
      scaffolding[maxOfLevel - levelNo][bayNo - 1] = sideProcessor(sides);
    });
  });

  return scaffolding;
};
