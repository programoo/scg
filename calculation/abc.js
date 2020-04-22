function findBC(x, y, z) {
    const B = y - x;
    const C = z - x;
    const result = {B: B, C: C}

    return result;
}

module.exports.findBC = findBC;