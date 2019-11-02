from pgmpy.models import BayesianModel
from pgmpy.inference.EliminationOrder import WeightedMinFill
from pgmpy.factors.discrete import TabularCPD

# BN 1
variables = ["d", "g", "i", "s", "l","x"]

level_1 = BayesianModel()

level_1.add_nodes_from(variables)
level_1.add_edges_from([("d","g"), ("i","g"), ("i","s"), ("g","l"), ("d","x")])

d_cpd = TabularCPD("d", 2, 2*[[1]])
g_cpd = TabularCPD("g", 2, 8*[[1]], ["d", "i"], [2, 2])
i_cpd = TabularCPD("i", 2, 2*[[1]])
s_cpd = TabularCPD("s", 2, 4*[[1]], ["i"], [2])
l_cpd = TabularCPD("l", 2, 4*[[1]], ["g"], [2])
x_cpd = TabularCPD("x", 2, 4*[[1]], ["d"], [2])
level_1.add_cpds(d_cpd, g_cpd, i_cpd, s_cpd, l_cpd, x_cpd)

query = ["l", "s"]
ordering = WeightedMinFill(level_1).get_elimination_order([n for n in variables if n not in query])

query = ["x", "s", "l"]
ordering = WeightedMinFill(level_1).get_elimination_order([n for n in variables if n not in query])

# BN 2
variables = ["a", "t", "s", "l", "e", "b", "x", "d"]

level_2 = BayesianModel()

level_2.add_nodes_from(variables)
level_2.add_edges_from([("a","t"), ("t","e"), ("s","l"), ("s","b"), ("l","e"), ("b","d"), ("e","d"), ("e","x")])

a_cpd = TabularCPD("a", 2, 2*[[1]])
t_cpd = TabularCPD("t", 2, 4*[[1]], ["a"], [2])
s_cpd = TabularCPD("s", 2, 2*[[1]])
l_cpd = TabularCPD("l", 2, 4*[[1]], ["s"], [2])
b_cpd = TabularCPD("b", 2, 4*[[1]], ["s"], [2])
d_cpd = TabularCPD("d", 2, 8*[[1]], ["b", "e"], [2, 2])
e_cpd = TabularCPD("e", 2, 8*[[1]], ["t", "l"], [2, 2])
x_cpd = TabularCPD("x", 2, 4*[[1]], ["e"], [2])
level_2.add_cpds(a_cpd, t_cpd, s_cpd, l_cpd, b_cpd, d_cpd, e_cpd, x_cpd)

query = ["a", "x", "s", "b", "d", "t"]
ordering = WeightedMinFill(level_2).get_elimination_order([n for n in variables if n not in query])
print(ordering)