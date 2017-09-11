define( ["qlik", "text!./happiness-chart.ng.html", "css!./happiness-chart.css"],
	function ( qlik, template ) {
		"use strict";
		return {
			template: template,
			initialProperties: {
				qHyperCubeDef: {
					qDimensions: [],
					qMeasures: [],
					qInitialDataFetch: [{
						qWidth: 50,
						qHeight: 50
					}]
				}
			},
			definition: {
				type: "items",
				component: "accordion",
				items: {
					dimensions: {
						uses: "dimensions",
						min: 1,
						max: 1
					},
					measures: {
						uses: "measures",
						min: 7,
						max: 7
					},
					mySection: {
						type: "items",
						label: "Settings",
						items: {
							MyStringProp: {
								ref: "teamName",
								label: "Team name",
								type: "string"
							},
							MyStringProp2: {
								ref: "percentage",
								label: "Show in percentage",
								type: "boolean",
								defaultValue: false
							}
						}
					}
				}
			},
			paint: function () {
			    var $scope = this.$scope;
				var numberOfMembers = $scope.layout.qHyperCube.qDataPages[0].qMatrix[0][7].qNum;
				$scope.week = $scope.layout.qHyperCube.qDataPages[0].qMatrix[0][0].qText;	
				var dataRows = [];
				$scope.amountAndPercentageData = [];
				
				//Create a copy of the data matrix
				$scope.layout.qHyperCube.qDataPages[0].qMatrix[0].forEach( function ( data ) {
					dataRows.push( data );
				} );		
							
				//Remove week and members data
				dataRows.splice(7, 1);
				dataRows.splice(0, 1);
				
				//Create one array with amount and percentage data
				dataRows.forEach( function ( row ) {
					//Create array of the amount
					var tempArray = [];
					for (var i = 0; i < Math.round( row.qNum * numberOfMembers ); i++) { 
						tempArray.push(i);
					}
		
					var tempObj = {
						amount: tempArray,
						percentage: Math.round( row.qNum * 100 )
					};
					
					$scope.amountAndPercentageData.push(tempObj);
				} );

				return qlik.Promise.resolve();
			}
		};

	} );
