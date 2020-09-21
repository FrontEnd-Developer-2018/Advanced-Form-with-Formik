/* eslint-disable max-lines */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable flowtype/no-types-missing-file-annotation */
/* eslint-disable complexity */
/* eslint-disable no-nested-ternary */
/* eslint-disable multiline-ternary */
/* eslint-disable max-statements */
import React, { Fragment, useRef, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import { Formik } from 'formik';
import CreatableSelect from 'react-select/creatable';
import { useDispatch } from 'react-redux';
import { createCircuit } from './actions';
import { useSelector } from 'react-redux';
import { openCheckPointCreate } from './actions';
import { ErrorMessage, FieldArray } from 'formik';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import deleteIcon from './delete-icon.png';
//import './style.scss';
import useStyles from './style';
//import { Alert } from '../../manageUsines/index';
import Snackbar from '@material-ui/core/Snackbar';
import { resetCreateCircuit } from './actions';
import { getCircuitList } from './actions';
import { ArrowBack, Fab } from '@material-ui/core';
import ArrowBackTwoToneIcon from '@material-ui/icons/ArrowBackTwoTone';

import {
  circuitOptions,
  equipementOptions,
  checkPointOptions,
  critereOptions,
  getOptions,
  roleOptions,
} from './helper';

const styles = (theme) => ({
  root: {
    margin: 0,
    // eslint-disable-next-line no-magic-numbers
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    // eslint-disable-next-line no-magic-numbers
    color: theme.palette.grey[500],
  },
  title: {
    textAlign: 'center',
    color: '#313745',
    fontSize: 40,
    fontWeight: 'bold',
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle className={classes.root} disableTypography {...other}>
      <Typography className={classes.title} variant="h4">
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

// eslint-disable-next-line max-statements,require-jsdoc,react/prop-types
export default function AdvancedFormik() {
  const dispatch = useDispatch();

  //const { usines } = useSelector((state) => state.usineList);
  const usines = [
    {
      id: '1',
      name: 'usine1',
      ateliers: {
        id: '1',
        name: 'atelier1',
        unites: { id: '1', name: 'unite1' },
      },
    },
  ];

  Const[(circuitOptions, setCircuitOptions)] = useState(
    getOptions(circuitOptions)
  );

  const configCircuit = useSelector(
    (state) => state.configCircuit.configCircuit
  );
  const checkPoints = configCircuit.checkpointList;
  const checkPointOptions = checkPoints
    ? getOptions(checkPoints)
    : [
        {
          id: 1,
          name: '',
        },
      ];

  const circuits_lst = configCircuit.circuitList;
  const circuitOptions = circuits_lst
    ? getOptions(circuits_lst)
    : [
        {
          id: 1,
          name: '',
        },
      ];

  const equipements_lst = configCircuit.equipementList;
  const equipementOptions = equipements_lst
    ? getOptions(equipements_lst)
    : [
        {
          id: 1,
          name: '',
        },
      ];

  const criteres_lst = configCircuit.criteriaList;
  const critereOptions = criteres_lst
    ? getOptions(criteres_lst)
    : [
        {
          id: 1,
          name: '',
        },
      ];

  const classes = useStyles();

  const circuitRef = useRef(null);
  const [usineOptions, setUsineOptions] = useState(getOptions(usines));
  const usineRef = useRef(null);

  const [atelierOptions, setAtelierOptions] = useState(null);
  const atelierRef = useRef(null);

  const [uniteOptions, setUniteOptions] = useState([]);
  const uniteRef = useRef(null);

  const [equipementsOptions, setEquipementsOptions] = useState([]);

  const equipementsRef = useRef(null);

  const [page, setPage] = useState(0);

  // eslint-disable-next-line no-shadow
  const switchPages = (page) => () => {
    setPage(page);
    if (page === 1) {
      // Dispatch(getConfigCircuit());
    }
  };

  const open = useSelector((state) => state.addCheckPoint.CheckPointCreateOpen);
  const { status } = useSelector((state) => state.createCircuit);

  const handleClose = () => {
    dispatch(openCheckPointCreate(false));
  };

  const handleChangeUsine = (value) => {
    if (value === null) {
      setAtelierOptions([]);
      return;
    }
    atelierRef.current.select.clearValue();
    const currentUsine = usines.find((usine) => usine.id === value.value);
    setAtelierOptions(getOptions(currentUsine.ateliers));
  };

  const handleChangeAtelier = (value) => {
    uniteRef.current.select.clearValue();
    if (value === null) {
      setUniteOptions([]);
      return;
    }
    const selectedUsine = usineRef.current.select.props.value;
    const currentUsine = usines.find(
      (usine) => usine.id === selectedUsine.value
    );
    const currentAtelier = currentUsine.ateliers.find(
      (atelier) => atelier.id === value.value
    );
    setUniteOptions(getOptions(currentAtelier.unites, true));
    // UniteRef.current.select.setValue(getOptions(currentAtelier.unites));
  };
  const initialValues = {
    circuit: null,
    role: null,
    usine: null,
    atelier: null,
    unite: null,
    equipements: [],
  };

  const handleResetCreate = () => {
    dispatch(resetCreateCircuit());
  };

  let handleresetForm = null;

  const formRef = useRef(null);

  useEffect(() => {
    if (status === 'success') {
      handleClose();
      // FormikFormRef.current.resetForm()
      dispatch(getCircuitList());
    }
  }, [status]);

  const dialogTitleText = 'Ajouter un circuit';
  let indexEquipUI = 0;
  let indexCheckpointUI = 0;
  let indexCritereUI = 0;

  return (
    <Fragment>
      <div
        style={{
          width: 'max-content',
          top: '30px',
          left: '136%',
          position: 'fixed',
          zIndex: '45000',
        }}
      >
        <Snackbar
          autoHideDuration={4000}
          className={classes.snackBar}
          onClose={handleResetCreate}
          open={status === 'success'}
          style={{ position: 'relative' }}
        >
          {/*<Alert severity="success">
            {'Le circuit a été ajouté avec succès'}
      </Alert> */}
        </Snackbar>
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          dispatch(createCircuit(values));
          // eslint-disable-next-line no-console
          handleresetForm = actions.resetForm;
          actions.setSubmitting(false);
        }}
        ref={formRef}
        validate={(values) => {
          const errors = {};
          if (!values.circuit) {
            errors.circuit = 'Requis';
          }
          if (!values.role) {
            errors.role = 'Requis';
          }
          if (!values.usine) {
            errors.usine = 'Requis';
          }
          if (!values.atelier) {
            errors.atelier = 'Requis';
          }
          if (!values.unite) {
            errors.unite = 'Requis';
          }
          if (values.equipements.length === 0) {
            errors.equipements = 'Requis';
          }
          return errors;
        }}
      >
        {(formik) => (
          <Fragment>
            <Dialog
              fullScreen
              onClose={() => {
                formik.resetForm();
                handleClose();
              }}
              open={open}
            >
              {page === 1 ? (
                <Fab
                  aria-label="back"
                  className={classes.fab}
                  onClick={switchPages(0)}
                  variant="round"
                >
                  <ArrowBackTwoToneIcon className={classes.icon} />
                  <div>Précédent</div>
                </Fab>
              ) : null}
              <DialogTitle className={classes.title} onClose={handleClose}>
                {dialogTitleText}
              </DialogTitle>
              <DialogContent className={classes.dialogContent}>
                {page === 0 ? (
                  <Grid
                    className={classes.root}
                    container
                    justify={'space-around'}
                    spacing={2}
                  >
                    <Grid item style={{ padding: '6px 6%' }} xs={7}>
                      <Typography className={classes.label}>
                        {'Sélectionnez un circuit'}
                      </Typography>
                      <CreatableSelect
                        isClearable
                        isSearchable
                        menuPlacement={'bottom'}
                        menuPosition="fixed"
                        onChange={(option, meta) => {
                          formik.setFieldValue('circuit', option);
                        }}
                        options={circuitOptions}
                        ref={circuitRef}
                        value={formik.values.circuit}
                      />
                      {formik.errors.circuit && formik.touched.circuit ? (
                        <span className={classes.error}>
                          {formik.errors.circuit}
                        </span>
                      ) : (
                        <span />
                      )}
                    </Grid>
                    <Grid item style={{ padding: '6px 6%' }} xs={7}>
                      <Typography className={classes.label}>
                        {'Sélectionnez un rôle'}
                      </Typography>
                      <Select
                        isSearchable
                        menuPlacement={'bottom'}
                        menuPosition="fixed"
                        onChange={(option, meta) => {
                          // HandleChangeSite(option, meta);
                          formik.setFieldValue('role', option);
                        }}
                        options={roleOptions}
                        value={formik.values.role}
                      />
                      {formik.errors.role && formik.touched.role ? (
                        <span className={classes.error}>
                          {formik.errors.role}
                        </span>
                      ) : (
                        <span />
                      )}
                    </Grid>

                    <Grid item style={{ padding: '6px 6%' }} xs={7}>
                      <Typography className={classes.label}>
                        {'Sélectionnez une usine'}
                      </Typography>
                      <Select
                        isSearchable
                        menuPlacement={'bottom'}
                        menuPosition="fixed"
                        onChange={(option, meta) => {
                          handleChangeUsine(option, meta);
                          formik.setFieldValue('usine', option);
                        }}
                        options={usineOptions}
                        ref={usineRef}
                        value={formik.values.usine}
                      />
                      {formik.errors.usine && formik.touched.usine ? (
                        <span className={classes.error}>
                          {formik.errors.usine}
                        </span>
                      ) : (
                        <span />
                      )}
                    </Grid>
                    <Grid item style={{ padding: '6px 6%' }} xs={7}>
                      <Typography className={classes.label}>
                        {'Sélectionnez un atelier'}
                      </Typography>

                      <Select
                        isSearchable
                        menuPlacement={'bottom'}
                        menuPosition="fixed"
                        onChange={(option, meta) => {
                          handleChangeAtelier(option, meta);
                          formik.setFieldValue('atelier', option);
                        }}
                        options={atelierOptions}
                        ref={atelierRef}
                        value={formik.values.atelier}
                      />
                      {formik.errors.atelier && formik.touched.atelier ? (
                        <span className={classes.error}>
                          {formik.errors.atelier}
                        </span>
                      ) : (
                        <span />
                      )}
                    </Grid>
                    <Grid item style={{ padding: '6px 6%' }} xs={7}>
                      <Typography className={classes.label}>
                        {'Sélectionnez une unité'}
                      </Typography>
                      <Select
                        isSearchable
                        menuPlacement={'bottom'}
                        menuPosition="fixed"
                        onChange={(option, meta) => {
                          formik.setFieldValue('unite', option);
                        }}
                        options={uniteOptions}
                        ref={uniteRef}
                        value={formik.values.unite}
                      />
                      {formik.errors.unite && formik.touched.unite ? (
                        <span className={classes.error}>
                          {formik.errors.unite}
                        </span>
                      ) : (
                        <span />
                      )}
                    </Grid>
                  </Grid>
                ) : (
                  <Fragment>
                    <Snackbar
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                      autoHideDuration={2000}
                      onClose={handleResetCreate}
                      open={status === 'error'}
                    >
                      {/*<Alert severity="error">
                        {
                          'Veuillez vérifier les informations saisies et réessayer'
                        }
                      </Alert> */}
                    </Snackbar>
                    <div style={{ width: '100%' }}>
                      <FieldArray
                        name="equipements"
                        render={(arrayHelpers) => {
                          const equipements = formik.values.equipements;
                          return (
                            <Fragment>
                              <div className="manageCircuitDialog-container__listContainer">
                                {equipements && equipements.length > 0
                                  ? equipements.map((equipItem, indexEquip) => (
                                      <div
                                        className="manageCircuitDialog-container__listContainer__listEqupements_row"
                                        key={`Equip-${equipItem.idui}`}
                                      >
                                        <ExpansionPanel>
                                          <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            style={{
                                              borderBottom: '0.1px solid',
                                              borderBottomColor: '#cccccc',
                                              height: '50px',
                                            }}
                                          >
                                            <div
                                              onClick={(event) => {
                                                event.stopPropagation();
                                              }}
                                              style={{
                                                minWidth: '33%',
                                                maxWidth: '33%',
                                              }}
                                            >
                                              <CreatableSelect
                                                isSearchable
                                                menuPlacement={'bottom'}
                                                menuPosition="fixed"
                                                onChange={(option, meta) => {
                                                  formik.setFieldValue(
                                                    `equipements.${indexEquip}.name`,
                                                    option
                                                  );
                                                }}
                                                options={equipementOptions}
                                                placeholder={
                                                  <div
                                                    style={{ fontSize: '14px' }}
                                                  >
                                                    Sélectionnez un
                                                    équipement...
                                                  </div>
                                                }
                                                value={
                                                  formik.values.equipements[
                                                    indexEquip
                                                  ].name
                                                }
                                              />
                                              <ErrorMessage
                                                name={`equipements.${indexEquip}.name`}
                                              />
                                            </div>
                                            <Button
                                              className={
                                                classes.deleteEquipButton
                                              }
                                              onClick={(event) => {
                                                arrayHelpers.remove(indexEquip);
                                                event.stopPropagation();
                                              }}
                                              variant="outlined"
                                            >
                                              <img
                                                className={
                                                  classes.deleteButtonIcon
                                                }
                                                src={deleteIcon}
                                              />
                                            </Button>
                                          </ExpansionPanelSummary>
                                          <ExpansionPanelDetails>
                                            <div style={{ width: '82%' }}>
                                              <FieldArray
                                                name={`equipements.${indexEquip}.checkpoints`}
                                                // eslint-disable-next-line no-shadow
                                                render={(arrayHelpers) => {
                                                  const checkpoints =
                                                    formik.values.equipements[
                                                      indexEquip
                                                    ].checkpoints;
                                                  return (
                                                    <div className="manageCircuitDialog-container__listCheckPoint">
                                                      {checkpoints &&
                                                      checkpoints.length > 0
                                                        ? checkpoints.map(
                                                            (
                                                              checkpointItem,
                                                              indexCheckpoint
                                                            ) => (
                                                              <div
                                                                className="listCheckPoints"
                                                                key={`Checkpoint-${checkpointItem.idui}`}
                                                              >
                                                                <ExpansionPanel>
                                                                  <ExpansionPanelSummary
                                                                    expandIcon={
                                                                      <ExpandMoreIcon />
                                                                    }
                                                                    style={{
                                                                      borderBottom:
                                                                        '0.1px solid',
                                                                      borderBottomColor:
                                                                        '#cccccc',
                                                                      height:
                                                                        '50px',
                                                                    }}
                                                                  >
                                                                    <div
                                                                      onClick={(
                                                                        event
                                                                      ) => {
                                                                        event.stopPropagation();
                                                                      }}
                                                                      style={{
                                                                        minWidth:
                                                                          '40%',
                                                                        maxWidth:
                                                                          '40%',
                                                                      }}
                                                                    >
                                                                      <CreatableSelect
                                                                        isSearchable
                                                                        menuPlacement={
                                                                          'bottom'
                                                                        }
                                                                        menuPosition="fixed"
                                                                        onChange={(
                                                                          option,
                                                                          meta
                                                                        ) => {
                                                                          formik.setFieldValue(
                                                                            `equipements.${indexEquip}.checkpoints.${indexCheckpoint}.name`,
                                                                            option
                                                                          );
                                                                        }}
                                                                        options={
                                                                          checkPointOptions
                                                                        }
                                                                        placeholder={
                                                                          <div
                                                                            style={{
                                                                              fontSize:
                                                                                '14px',
                                                                            }}
                                                                          >
                                                                            Sélectionnez
                                                                            un
                                                                            check-point...
                                                                          </div>
                                                                        }
                                                                        value={
                                                                          formik
                                                                            .values
                                                                            .equipements[
                                                                            indexEquip
                                                                          ]
                                                                            .checkpoints[
                                                                            indexCheckpoint
                                                                          ].name
                                                                        }
                                                                      />
                                                                      <ErrorMessage
                                                                        name={`equipements.${indexEquip}.checkpoints.${indexCheckpoint}.name`}
                                                                      />
                                                                    </div>
                                                                    <Button
                                                                      className={
                                                                        classes.deleteCheckPointButton
                                                                      }
                                                                      onClick={(
                                                                        event
                                                                      ) => {
                                                                        arrayHelpers.remove(
                                                                          indexCheckpoint
                                                                        );
                                                                        event.stopPropagation();
                                                                      }}
                                                                      variant="outlined"
                                                                    >
                                                                      <img
                                                                        className={
                                                                          classes.deleteButtonIcon
                                                                        }
                                                                        src={
                                                                          deleteIcon
                                                                        }
                                                                      />
                                                                    </Button>
                                                                  </ExpansionPanelSummary>
                                                                  <ExpansionPanelDetails>
                                                                    <div
                                                                      style={{
                                                                        width:
                                                                          '82%',
                                                                      }}
                                                                    >
                                                                      <FieldArray
                                                                        name={`equipements.${indexEquip}.checkpoints.${indexCheckpoint}.criteres`}
                                                                        // eslint-disable-next-line no-shadow
                                                                        render={(
                                                                          arrayHelpers
                                                                        ) => {
                                                                          const criteres =
                                                                            formik
                                                                              .values
                                                                              .equipements[
                                                                              indexEquip
                                                                            ]
                                                                              .checkpoints[
                                                                              indexCheckpoint
                                                                            ]
                                                                              .criteres;
                                                                          return (
                                                                            <div
                                                                              style={{
                                                                                position:
                                                                                  'relative',
                                                                              }}
                                                                            >
                                                                              {criteres &&
                                                                              criteres.length >
                                                                                0
                                                                                ? criteres.map(
                                                                                    (
                                                                                      critereItem,
                                                                                      indexCritere
                                                                                    ) => (
                                                                                      <div
                                                                                        className="listCriteres"
                                                                                        key={`Critere-${critereItem.idui}`}
                                                                                        style={{
                                                                                          minWidth:
                                                                                            '70%',
                                                                                          maxWidth:
                                                                                            '70%',
                                                                                        }}
                                                                                      >
                                                                                        <div>
                                                                                          <Button
                                                                                            className={
                                                                                              classes.deleteCritereButton
                                                                                            }
                                                                                            onClick={(
                                                                                              event
                                                                                            ) => {
                                                                                              arrayHelpers.remove(
                                                                                                indexCritere
                                                                                              );
                                                                                              event.stopPropagation();
                                                                                            }}
                                                                                            variant="outlined"
                                                                                          >
                                                                                            <img
                                                                                              className={
                                                                                                classes.deleteButtonIcon
                                                                                              }
                                                                                              src={
                                                                                                deleteIcon
                                                                                              }
                                                                                            />
                                                                                          </Button>
                                                                                        </div>
                                                                                        <div
                                                                                          className="item-Critere"
                                                                                          onClick={(
                                                                                            event
                                                                                          ) => {
                                                                                            event.stopPropagation();
                                                                                          }}
                                                                                        >
                                                                                          <CreatableSelect
                                                                                            isSearchable
                                                                                            menuPlacement={
                                                                                              'bottom'
                                                                                            }
                                                                                            menuPosition="fixed"
                                                                                            onChange={(
                                                                                              option,
                                                                                              meta
                                                                                            ) => {
                                                                                              formik.setFieldValue(
                                                                                                `equipements.${indexEquip}.checkpoints.${indexCheckpoint}.criteres.${indexCritere}.name`,
                                                                                                option
                                                                                              );
                                                                                            }}
                                                                                            options={
                                                                                              critereOptions
                                                                                            }
                                                                                            placeholder={
                                                                                              <div
                                                                                                style={{
                                                                                                  fontSize:
                                                                                                    '14px',
                                                                                                }}
                                                                                              >
                                                                                                Sélectionnez
                                                                                                un
                                                                                                critère...
                                                                                              </div>
                                                                                            }
                                                                                            value={
                                                                                              formik
                                                                                                .values
                                                                                                .equipements[
                                                                                                indexEquip
                                                                                              ]
                                                                                                .checkpoints[
                                                                                                indexCheckpoint
                                                                                              ]
                                                                                                .criteres[
                                                                                                indexCritere
                                                                                              ]
                                                                                                .name
                                                                                            }
                                                                                          />
                                                                                        </div>
                                                                                      </div>
                                                                                    )
                                                                                  )
                                                                                : null}

                                                                              <button
                                                                                className={
                                                                                  classes.addCritereButton
                                                                                }
                                                                                onClick={() => {
                                                                                  arrayHelpers.push(
                                                                                    {
                                                                                      name:
                                                                                        '',
                                                                                      idui: indexCritereUI,
                                                                                    }
                                                                                  );
                                                                                  indexCritereUI += 1;
                                                                                }}
                                                                                type="button"
                                                                              >
                                                                                <span
                                                                                  className={
                                                                                    classes.buttonCritereTxt
                                                                                  }
                                                                                >
                                                                                  {
                                                                                    'Ajouter un critère'
                                                                                  }
                                                                                </span>
                                                                              </button>
                                                                            </div>
                                                                          );
                                                                        }}
                                                                      />
                                                                    </div>
                                                                  </ExpansionPanelDetails>
                                                                </ExpansionPanel>
                                                              </div>
                                                            )
                                                          )
                                                        : null}
                                                      <button
                                                        className={
                                                          classes.addCheckPointButton
                                                        }
                                                        onClick={() => {
                                                          arrayHelpers.push({
                                                            name: '',
                                                            idui: indexCheckpointUI,
                                                          });
                                                          indexCheckpointUI += 1;
                                                        }}
                                                        type="button"
                                                      >
                                                        <span
                                                          className={
                                                            classes.buttonCheckPointTxt
                                                          }
                                                        >
                                                          {
                                                            'Ajouter un check-point'
                                                          }
                                                        </span>
                                                      </button>
                                                    </div>
                                                  );
                                                }}
                                              />
                                            </div>
                                          </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                      </div>
                                    ))
                                  : null}
                              </div>

                              <button
                                className={classes.addEquipButton}
                                onClick={() => {
                                  arrayHelpers.push({
                                    name: '',
                                    idui: indexEquipUI,
                                  });
                                  indexEquipUI += 1;
                                }}
                                type="button"
                              >
                                <span className={classes.buttonEquipTxt}>
                                  {'Ajouter un équipement'}
                                </span>
                              </button>
                            </Fragment>
                          );
                        }}
                      />
                    </div>
                  </Fragment>
                )}
              </DialogContent>
              <DialogActions>
                <Grid
                  alignItems="center"
                  className={classes.dots}
                  container
                  direction="column"
                  justify="center"
                  spacing={0}
                >
                  {page === 0 ? (
                    <Fragment>
                      <Grid item xs={2}>
                        <Button
                          className={classes.confirm}
                          onClick={switchPages(1)}
                        >
                          Suivant
                        </Button>
                      </Grid>
                      <Grid item xs={2}>
                        <div style={{ 'margin-right': '96px' }}>
                          <div className="oval-dark" onClick={switchPages(0)} />
                          <div
                            className="oval-light"
                            onClick={switchPages(1)}
                          />
                        </div>
                      </Grid>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Grid item xs={2}>
                        <Button
                          className={classes.confirm}
                          onClick={formik.handleSubmit}
                        >
                          Valider
                        </Button>
                      </Grid>
                      <Grid item xs={2}>
                        <div style={{ 'margin-right': '96px' }}>
                          <div
                            className="oval-light"
                            onClick={switchPages(0)}
                          />
                          <div className="oval-dark" onClick={switchPages(1)} />
                        </div>
                      </Grid>
                    </Fragment>
                  )}
                </Grid>
              </DialogActions>
            </Dialog>
          </Fragment>
        )}
      </Formik>
    </Fragment>
  );
}
