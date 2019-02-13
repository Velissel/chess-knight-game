import _ from 'lodash';

/**
 * BFS algorithm, check https://en.wikipedia.org/wiki/Breadth-first_search
 * if a path can not be found, null is returned
 * @param  {any} start         
 * @param  {any} goal          
 * @param  {array} getSuccessors 
 * @param  {boolean} comparator    
 * @return {array}               an array of path leads to goal
 */
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