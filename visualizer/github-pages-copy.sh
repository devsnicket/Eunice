rm -f -rf gh-pages/arrows &&
cp -r createDependencyGroupFactories/createArrows/tests/withUse/test-cases gh-pages/arrows &&
cp createDependencyGroupFactories/createArrows/tests/symbols/test-cases/down-10x10-*.svg gh-pages/arrows &&
rm -f -rf gh-pages/examples &&
mkdir gh-pages/examples &&
mkdir gh-pages/examples/level &&
cp tests/test-cases/examples/item-depends-upon-parent/.svg gh-pages/examples/item-depends-upon-parent.svg &&
cp tests/test-cases/examples/level/first-depends-upon-second/.svg gh-pages/examples/level/first-depends-upon-second.svg &&
cp tests/test-cases/examples/level/first-item-depends-upon-second-item/.svg gh-pages/examples/level/first-item-depends-upon-second-item.svg &&
cp tests/test-cases/examples/level/two-interdependent/.svg gh-pages/examples/level/two-interdependent.svg &&
cp tests/test-cases/examples/parent-depends-upon-item/.svg gh-pages/examples/parent-depends-upon-item.svg &&
mkdir gh-pages/examples/stack &&
cp tests/test-cases/examples/stack/lower-depends-upon-upper/.svg gh-pages/examples/stack/lower-depends-upon-upper.svg &&
cp tests/test-cases/examples/stack/two-interdependent/.svg gh-pages/examples/stack/two-interdependent.svg &&
cp tests/test-cases/examples/stack/upper-depends-upon-lower/.svg gh-pages/examples/stack/upper-depends-upon-lower.svg &&
cp tests/test-cases/examples/two/.svg gh-pages/examples/two.svg &&
mkdir gh-pages/examples/parent &&
cp tests/withParent/test-cases/examples/upper-child-depends-upon-lower-child/.svg gh-pages/examples/parent/upper-child-depends-upon-lower-child.svg
cp tests/withParent/test-cases/examples/inner-dependencies-of-multiple-children/.svg gh-pages/examples/parent/inner-dependencies-of-multiple-children.svg
cp tests/withParent/test-cases/examples/outer-dependencies/.svg gh-pages/examples/parent/outer-dependencies.svg