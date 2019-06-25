/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	() => {
		const parentsOfParentByUndeclaredReferences = new Map();

		return (
			{
				addAncestorsAndParentOfReference,
				hasReferenceTo,
			}
		);

		function addAncestorsAndParentOfReference({
			ancestors,
			parent,
			reference,
		}) {
			parentsOfParentByUndeclaredReferences.set(
				reference,
				[
					...parentsOfParentByUndeclaredReferences.get(reference) || [],
					...ancestors.filter(ancestor => ancestor !== parent),
				],
			);
		}

		function hasReferenceTo({
			parent,
			reference,
		}) {
			const parentsOfReferenceParent =
				parentsOfParentByUndeclaredReferences.get(reference);

			return (
				parentsOfReferenceParent
				&&
				(!parent || parentsOfReferenceParent.includes(parent))
			);
		}
	};