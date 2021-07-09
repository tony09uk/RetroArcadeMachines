import { HeaderItem } from '@core/modules/grid/models/header-item';

export interface RoadmapTable {
    id: HeaderItem;
    name: HeaderItem;
    description: HeaderItem;
    isStarted: HeaderItem;
    percentageCompleted: HeaderItem;
    order: HeaderItem;
}
