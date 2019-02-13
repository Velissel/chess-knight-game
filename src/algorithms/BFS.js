import _ from 'lodash';

export default (start, goal, getSuccessors, comparator) => {
    const queue = [];
    const visited = [];
    queue.push([start]);

    while(queue.length > 0) {
        const path = queue.pop();
        const node = path[path.length - 1];

        if (comparator(node, goal)) {
            return path;
        }

        // get successors and remove visited ones
        const successors = getSuccessors(node).filter(successor => {
            return _.findIndex(visited, visitedNode => comparator(successor, visitedNode)) < 0;
        });

        successors.forEach(successor => {
            const newPath = [].concat(path);
            newPath.push(successor);
            queue.splice(0, 0, newPath);
        });
        visited.push(node);
    }

    return null;
}